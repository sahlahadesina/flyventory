
import cv2
import numpy as np
import time
from pyzbar.pyzbar import decode

def decode_image(enhanced_roi):
    """Decode barcode from an enhanced region of interest (ROI) and return the most confident result."""
    barcodes = decode(enhanced_roi)
    
    if not barcodes:
        return None

    # Select the longest barcode data (heuristic for best confidence)
    best_barcode = max(barcodes, key=lambda b: len(b.data), default=None)
    
    if best_barcode:
        data = best_barcode.data.decode('utf-8')
        barcode_type = best_barcode.type
        return f"{data} ({barcode_type})"
    
    return None

# Initialize OpenCV's barcode detector
barcode_detector = cv2.barcode_BarcodeDetector()

# Create windows for display
#cv2.namedWindow("FrameIn", cv2.WINDOW_NORMAL)
cv2.namedWindow("FrameOut", cv2.WINDOW_NORMAL)

# Open webcam
cap = cv2.VideoCapture(0)
if not cap.isOpened():
    print("Error: Could not open video capture device.")
    exit()

while True:
    ret, frame = cap.read()
    if not ret:
        print("Failed to capture frame. Exiting.")
        break

    #cv2.imshow("FrameIn", frame)

    # Detect and decode barcodes
    ret_val, decoded_info, decoded_type, corners = barcode_detector.detectAndDecodeWithType(frame)

    if corners is not None and len(corners) > 0:
        cv2.putText(frame, "Barcode Detected", (50, 50), 
                    cv2.FONT_HERSHEY_COMPLEX, 1, (0, 255, 255), 2)

        for i in range(len(decoded_info)):
            pts = corners[i].reshape((-1, 1, 2)).astype(np.int32)
            cv2.polylines(frame, [pts], isClosed=True, color=(0, 255, 255), thickness=2)

            # Extract Region of Interest (ROI)
            x, y, w, h = cv2.boundingRect(pts)
            padding = 5
            x, y = max(0, x - padding), max(0, y - padding)
            w, h = min(frame.shape[1] - x, w + 2 * padding), min(frame.shape[0] - y, h + 2 * padding)
            roi = frame[y:y+h, x:x+w].copy()

            if roi.size == 0:
                continue  # Skip invalid ROI

            # Enhance the ROI for better barcode detection
            gray = cv2.cvtColor(roi, cv2.COLOR_BGR2GRAY)
            contrast_enhanced = cv2.adaptiveThreshold(gray, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
                                                      cv2.THRESH_BINARY, 11, 2)

            # Time the decoding process
            start_time = time.time()
            decoded_value = decode_image(contrast_enhanced)
            end_time = time.time()
            decode_time = end_time - start_time

            if decoded_value:
                        # Display the decoded text on the frame
                text_x = x  # Place text near barcode
                text_y = y - 10 if y - 10 > 20 else y + 20  # Avoid placing text outside frame

                cv2.putText(frame, decoded_value, (text_x, text_y), 
                cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 0, 255), 2)
                print(f"Decoded from enhanced ROI: {decoded_value}")
                print(f"Time taken: {decode_time:.4f} seconds")

            # Ensure we don't show an empty ROI
            if roi.shape[0] > 0 and roi.shape[1] > 0:
                cv2.imshow("ROI", roi)

    cv2.imshow("FrameOut", frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()