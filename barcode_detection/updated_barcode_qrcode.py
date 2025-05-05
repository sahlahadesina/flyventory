## Updated IMX500-Compatible Code ##
from picamera2 import Picamera2
from ultralytics import YOLO
import cv2
from pyzbar import pyzbar  # Keep your existing decoder

def decode_barcode(image):
    """Your existing decoding logic"""
    barcodes = pyzbar.decode(image)
    return [b.data.decode("utf-8") for b in barcodes]

# Initialize IMX500 Camera (REPLACES OpenCV VideoCapture)
picam2 = Picamera2()
config = picam2.create_video_configuration(
    main={"size": (640, 640), "format": "RGB888"},
    queue=False
)
picam2.configure(config)
picam2.start()

# Load exported IMX model (UPDATE PATH)
model = YOLO("/path/to/best_imx_model")  

while True:
    # Capture from IMX sensor (DIFFERENT FROM OpenCV)
    frame = picam2.capture_array("main")
    
    # YOLO Inference (SIMILAR BUT OPTIMIZED)
    results = model(frame, imgsz=640, stream=True)
    
    # Process detections (UPDATED OUTPUT FORMAT)
    for result in results:
        boxes = result.boxes.xyxy.cpu().numpy()
        classes = result.boxes.cls.cpu().numpy()
        
        for box, cls in zip(boxes, classes):
            x1, y1, x2, y2 = map(int, box)
            label = model.names[int(cls)]
            
            if label in ["barcode", "qrcode"]:
                # Draw bounding box
                cv2.rectangle(frame, (x1, y1), (x2, y2), (0,255,0), 2)
                
                # Your decoding logic (KEPT FROM ORIGINAL)
                roi = frame[y1:y2, x1:x2]
                decoded = decode_barcode(roi)
                
                if decoded:
                    text = f"{label}: {decoded[0]}"
                    cv2.putText(frame, text, (x1, y1-10), 
                               cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0,255,0), 2)

    # Display (SAME AS BEFORE)
    cv2.imshow("IMX500 Detection", frame)
    if cv2.waitKey(1) == ord('q'):
        break

picam2.stop()
cv2.destroyAllWindows()
