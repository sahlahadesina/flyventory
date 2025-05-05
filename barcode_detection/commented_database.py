import cv2
import numpy as np
import time
from pyzbar.pyzbar import decode
from ultralytics import YOLO
from picamera2 import Picamera2
import threading

# Optional: MySQL connection
# import mysql.connector
# conn = mysql.connector.connect(
#     host="192.168.3.87",  
#     user="root",
#     password="1234",
#     database="warehouse"
# )
# cursor = conn.cursor()

class BarcodeDetector:

    def decode_barcode(self, enhanced_roi):
        barcodes = decode(enhanced_roi)
        if not barcodes:
            return None
        
        best_barcode = max(barcodes, key=lambda b: len(b.data), default=None)
        if best_barcode:
            data = best_barcode.data.decode('utf-8')
            barcode_type = best_barcode.type
            print(f"Decoded: {data} ({barcode_type})")

            # Check DB (uncomment if using DB)
            # exists = self.update_asset_status(data)
            # if exists:
            #     print("Found")
            #     product_info = self.get_product_info(data)
            #     if product_info:
            #         print(f"Product Found: {product_info}")  
            #     else:
            #         print(f"Barcode {data} NOT found in DB.")

            return f"{data} ({barcode_type})"
        return None

    # Uncomment to enable MySQL usage
    # def update_asset_status(self, barcode_id):
    #     query = "SELECT * FROM identification WHERE IdentifierValue = %s"
    #     cursor.execute(query, (barcode_id,))
    #     resultset = cursor.fetchall()
    #     if resultset:
    #         asset_id = resultset[0][1]
    #         query = "UPDATE asset SET AssetFound = 1 WHERE AssetID = %s"
    #         cursor.execute(query, (asset_id,))
    #         conn.commit()
    #         return True
    #     return False

    # def get_product_info(self, barcode_id):
    #     query = "SELECT * FROM identification WHERE IdentifierValue = %s"
    #     cursor.execute(query, (barcode_id,))
    #     resultset = cursor.fetchall()
    #     if resultset:
    #         asset_id = resultset[0][1]
    #         query = "SELECT * FROM asset WHERE AssetID = %s"
    #         cursor.execute(query, (asset_id,))
    #         asset_info = cursor.fetchone()
    #         if asset_info:
    #             product_id = asset_info[1]
    #             query = "SELECT * FROM product WHERE ProductID = %s"
    #             cursor.execute(query, (product_id,))
    #             product_info = cursor.fetchall()
    #             return product_info
    #     return None

def enhance_roi(roi):
    if roi is None or roi.size == 0:
        return None
    gray = cv2.cvtColor(roi, cv2.COLOR_BGR2GRAY)
    enhanced = cv2.convertScaleAbs(gray, alpha=1.5, beta=15)
    enhanced = cv2.adaptiveThreshold(enhanced, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
                                     cv2.THRESH_BINARY, 11, 2)
    return enhanced

def main():
    barcode_detector = BarcodeDetector()

    # Setup Picamera2
    picam2 = Picamera2()
    picam2.configure(picam2.create_preview_configuration(main={"size": (720, 720)}))
    picam2.start()

    frame = None
    lock = threading.Lock()

    def update_frame():
        nonlocal frame
        while True:
            with lock:
                frame = picam2.capture_array()

    threading.Thread(target=update_frame, daemon=True).start()
    time.sleep(2)  # Let camera warm up

    barcode_cv2 = cv2.barcode_BarcodeDetector()

    while True:
        with lock:
            current_frame = frame.copy()

        if current_frame is None:
            continue

        frame_out = current_frame.copy()

        # Decode with pyzbar
        barcodes = decode(current_frame)
        for barcode in barcodes:
            data = barcode.data.decode('utf-8')
            barcode_type = barcode.type
            (x, y, w, h) = barcode.rect
            cv2.rectangle(frame_out, (x, y), (x + w, y + h), (0, 255, 0), 2)
            cv2.putText(frame_out, f"{data} ({barcode_type})", (x, y - 10),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 2)

            roi = current_frame[y:y + h, x:x + w].copy()
            if roi.size == 0:
                continue
            enhanced = enhance_roi(roi)
            decoded_val = barcode_detector.decode_barcode(enhanced)
            if decoded_val:
                print(f"Decoded (pyzbar): {decoded_val}")
                cv2.imshow("Enhanced ROI", enhanced)

        # Decode with OpenCV BarcodeDetector
        ret_val, decoded_info, decoded_type, corners = barcode_cv2.detectAndDecodeWithType(current_frame)
        if corners is not None:
            for i in range(len(decoded_info)):
                pts = corners[i].reshape((-1, 1, 2)).astype(np.int32)
                cv2.polylines(frame_out, [pts], True, (0, 255, 255), 2)

                x, y, w, h = cv2.boundingRect(pts)
                padding = 5
                x, y = max(0, x - padding), max(0, y - padding)
                w, h = min(current_frame.shape[1] - x, w + 2 * padding), min(current_frame.shape[0] - y, h + 2 * padding)

                roi = current_frame[y:y+h, x:x+w].copy()
                if roi.size == 0:
                    continue
                enhanced_roi = enhance_roi(roi)
                decoded_val = barcode_detector.decode_barcode(enhanced_roi)

                if decoded_val:
                    cv2.putText(frame_out, decoded_val, (x, y - 10),
                                cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 0, 255), 2)
                    print(f"Decoded (cv2.barcode): {decoded_val}")
                    cv2.imshow("Enhanced ROI", enhanced_roi)

        cv2.imshow("FrameOut", frame_out)

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    picam2.close()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    main()
