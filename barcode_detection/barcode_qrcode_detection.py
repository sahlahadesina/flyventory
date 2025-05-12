# Final updated barcode qrcode detection code using YOLOv8 on the Sony IMX 500 camera connected to the database and updating website in real time.

import argparse
import sys
from functools import lru_cache
import cv2
import numpy as np
from pyzbar.pyzbar import decode
from picamera2 import MappedArray, Picamera2
from picamera2.devices import IMX500
from picamera2.devices.imx500 import NetworkIntrinsics, postprocess_nanodet_detection
import mysql.connector

last_detections = []
conn = mysql.connector.connect(
    host="192.168.22.87",
    user="root",
    password="1234",
    database="warehouse"
)
cursor = conn.cursor()

def update_asset_status(ids):
    query = "SELECT * FROM identification WHERE IdentifierValue = %s"
    cursor.execute(query, (ids,))
    resultset = cursor.fetchall()
    if resultset:
        asset_id = resultset[0][1]
        print(f"asset id{asset_id}")
        update_query = "UPDATE asset SET AssetFound = 1 WHERE AssetID = %s"
        cursor.execute(update_query, (asset_id,))
        conn.commit()
        return True
    return False

def get_product_info(ids):
    query = "SELECT * FROM identification WHERE IdentifierValue = %s"
    cursor.execute(query, (ids,))
    resultset = cursor.fetchall()
    if resultset:
        asset_id = resultset[0][1]
        asset_query = "SELECT * FROM asset WHERE AssetID = %s"
        cursor.execute(asset_query, (asset_id,))
        asset_info = cursor.fetchone()
        if asset_info:
            product_id = asset_info[1]
            product_query = "SELECT * FROM product WHERE ProductID = %s"
            cursor.execute(product_query, (product_id,))
            product_info = cursor.fetchall()
            return product_info
    return None


class Detection:
    def __init__(self, coords, category, conf, metadata):
        self.category = category
        self.conf = conf
        self.box = imx500.convert_inference_coords(coords, metadata, picam2)

def parse_detections(metadata: dict):
    global last_detections
    bbox_normalization = intrinsics.bbox_normalization
    bbox_order = intrinsics.bbox_order
    threshold = args.threshold
    iou = args.iou
    max_detections = args.max_detections

    np_outputs = imx500.get_outputs(metadata, add_batch=True)
    input_w, input_h = imx500.get_input_size()
    if np_outputs is None:
        return last_detections

    if intrinsics.postprocess == "nanodet":
        boxes, scores, classes = postprocess_nanodet_detection(
            outputs=np_outputs[0], conf=threshold, iou_thres=iou,
            max_out_dets=max_detections
        )[0]
        from picamera2.devices.imx500.postprocess import scale_boxes
        boxes = scale_boxes(boxes, 1, 1, input_h, input_w, False, False)
    else:
        boxes, scores, classes = np_outputs[0][0], np_outputs[1][0], np_outputs[2][0]
        if bbox_normalization:
            boxes = boxes / input_h
        if bbox_order == "xy":
            boxes = boxes[:, [1, 0, 3, 2]]
        boxes = np.array_split(boxes, 4, axis=1)
        boxes = zip(*boxes)

    last_detections = [
        Detection(box, category, score, metadata)
        for box, score, category in zip(boxes, scores, classes)
        if score > threshold
    ]
    return last_detections

@lru_cache
def get_labels():
    labels = intrinsics.labels
    if intrinsics.ignore_dash_labels:
        labels = [label for label in labels if label and label != "-"]
    return labels

def enhance_roi(roi):
    if roi is None or roi.size == 0:
        print("Error: ROI is empty or invalid.")
        return None
    gray = cv2.cvtColor(roi, cv2.COLOR_BGR2GRAY)
    equalized = cv2.equalizeHist(gray)
    return equalized

def try_decode_all_orientations(roi):
    angles = {
        0: None,
        90: cv2.ROTATE_90_CLOCKWISE,
        180: cv2.ROTATE_180,
        270: cv2.ROTATE_90_COUNTERCLOCKWISE
    }
    for angle, flag in angles.items():
        rotated = cv2.rotate(roi, flag) if flag else roi
        decoded = decode(rotated)
        if decoded:
            return decoded[0]
    return None

def decode_codes(img, roi, label, roi_origin=(0, 0)):
    if roi is None or roi.size == 0:
        print("No valid ROI passed to decode_codes.")
        return None

    result = try_decode_all_orientations(roi) or try_decode_all_orientations(enhance_roi(roi))
    if not result:
        print("No codes found.")
        return

    data = result.data.decode('utf-8')
    code_type = result.type
    (x, y, w, h) = result.rect
    x += roi_origin[0]
    y += roi_origin[1]

    print(f"{label.capitalize()} Found: {data} ({code_type})")
    cv2.putText(img, f"{data} ({code_type})", (x, y - 10),
                cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 2)

    # Database interaction
    if update_asset_status(data):
        print("Asset status updated in the database.")
        product_info = get_product_info(data)
        if product_info:
            print(f"Product Information: {product_info}")
        else:
            print(f"No product information found for: {data}")
    else:
        print(f"{data} not found in the database.")

def draw_detections(request, stream="main"):
    detections = last_results
    if detections is None:
        return
    labels = get_labels()
    with MappedArray(request, stream) as m:
        for detection in detections:
            x, y, w, h = detection.box
            category = int(detection.category)
            label_text = f"{labels[category]} ({detection.conf:.2f})" if category < len(labels) else f"Class {category} ({detection.conf:.2f})"

            pad = 10
            x_p = max(0, x - pad)
            y_p = max(0, y - pad)
            w_p = min(m.array.shape[1] - x_p, w + 2 * pad)
            h_p = min(m.array.shape[0] - y_p, h + 2 * pad)
            roi = m.array[y_p:y_p + h_p, x_p:x_p + w_p]

            cat_label = labels[category].lower() if category < len(labels) else "unknown"
            print("Detected label:", cat_label)
            if (detect_mode == "both") or \
               (detect_mode == "barcode" and "barcode" in cat_label) or \
               (detect_mode == "qrcode" and "qrcode" in cat_label):
                decode_codes(m.array, roi, cat_label, roi_origin=(x_p, y_p))

            (text_width, text_height), baseline = cv2.getTextSize(label_text, cv2.FONT_HERSHEY_SIMPLEX, 0.5, 1)
            text_x, text_y = x + 5, y + 15
            overlay = m.array.copy()
            cv2.rectangle(overlay, (text_x, text_y - text_height), (text_x + text_width, text_y + baseline),
                          (255, 255, 255), cv2.FILLED)
            cv2.addWeighted(overlay, 0.30, m.array, 0.70, 0, m.array)
            cv2.putText(m.array, label_text, (text_x, text_y),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255), 1)
            cv2.rectangle(m.array, (x, y), (x + w, y + h), (0, 255, 0, 0), thickness=2)

        if intrinsics.preserve_aspect_ratio:
            b_x, b_y, b_w, b_h = imx500.get_roi_scaled(request)
            cv2.putText(m.array, "ROI", (b_x + 5, b_y + 15), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 0, 0), 1)
            cv2.rectangle(m.array, (b_x, b_y), (b_x + b_w, b_y + b_h), (255, 0, 0, 0))

def get_args():
    parser = argparse.ArgumentParser()
    parser.add_argument("--model", type=str,
                        default="/usr/share/imx500-models/imx500_network_ssd_mobilenetv2_fpnlite_320x320_pp.rpk")
    parser.add_argument("--fps", type=int)
    parser.add_argument("--bbox-normalization", action=argparse.BooleanOptionalAction)
    parser.add_argument("--bbox-order", choices=["yx", "xy"], default="yx")
    parser.add_argument("--threshold", type=float, default=0.55)
    parser.add_argument("--iou", type=float, default=0.65)
    parser.add_argument("--max-detections", type=int, default=10)
    parser.add_argument("--ignore-dash-labels", action=argparse.BooleanOptionalAction)
    parser.add_argument("--postprocess", choices=["", "nanodet"], default=None)
    parser.add_argument("-r", "--preserve-aspect-ratio", action=argparse.BooleanOptionalAction)
    parser.add_argument("--labels", type=str)
    parser.add_argument("--print-intrinsics", action="store_true")
    return parser.parse_args()

# === Ask user what they want to detect ===
print("Select detection mode:")
print("1. Barcode")
print("2. QR Code")
mode_input = input("Enter 1 or 2: ").strip()
if mode_input == "1":
    detect_mode = "barcode"
elif mode_input == "2":
    detect_mode = "qrcode"

print(f"\n[INFO] Detecting: {detect_mode.upper()}")

# === Setup and run camera ===
args = get_args()
imx500 = IMX500(args.model)
intrinsics = imx500.network_intrinsics or NetworkIntrinsics()

for key, value in vars(args).items():
    if key == 'labels' and value is not None:
        with open(value, 'r') as f:
            intrinsics.labels = f.read().splitlines()
    elif hasattr(intrinsics, key) and value is not None:
        setattr(intrinsics, key, value)

if intrinsics.labels is None:
    with open("assets/coco_labels.txt", "r") as f:
        intrinsics.labels = f.read().splitlines()
intrinsics.update_with_defaults()

if args.print_intrinsics:
    print(intrinsics)
    exit()

picam2 = Picamera2(imx500.camera_num)
config = picam2.create_preview_configuration(
    controls={"FrameRate": intrinsics.inference_rate},
    buffer_count=12
)
imx500.show_network_fw_progress_bar()
picam2.start(config, show_preview=True)

if intrinsics.preserve_aspect_ratio:
    imx500.set_auto_aspect_ratio()

last_results = None
picam2.pre_callback = draw_detections

while True:
    last_results = parse_detections(picam2.capture_metadata())
