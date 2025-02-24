import mysql.connector
import cv2
import csv
import numpy as np
import time
from pyzbar.pyzbar import decode
from ultralytics import YOLO

# MySQL connection
conn = mysql.connector.connect(
    host="192.168.3.87",  
    user="root",
    password="1234",
    database="warehouse"
)

cursor = conn.cursor()

# Barcode Detector Class
class BarcodeDetector:

    def decode_barcode(self, enhanced_roi):
        """Decode barcode from an enhanced region of interest (ROI) and return the most confident result."""
        barcodes = decode(enhanced_roi)
        
        if not barcodes:
            return None
    
        # Select the longest barcode data (heuristic for best confidence)
        best_barcode = max(barcodes, key=lambda b: len(b.data), default=None)
        
        if best_barcode:
            data = best_barcode.data.decode('utf-8')
            barcode_type = best_barcode.type
            
            # check if the barcode exists in the database
            exists = self.update_asset_status(data)
            if exists:
                print("Found")
                product_info = self.get_product_info(data)
                if product_info:
                    print(f"Product Found: {product_info}")  
                else:
                    print(f"Barcode {data} NOT found in the database.")
            
            return f"{data} ({barcode_type})"
        
        return None

    def update_asset_status(self, barcode_id):
        query = "SELECT * FROM identification WHERE IdentifierValue = %s"
        cursor.execute(query, (barcode_id,))
        resultset = cursor.fetchall()
        for row in resultset:
            asset_id = row[1]
            print("AssetID:", asset_id)
        
        if resultset:
            query = "UPDATE asset SET AssetFound = 1 WHERE AssetID = %s"
            cursor.execute(query, (asset_id,))            
            conn.commit()
            return True
        return False

    def get_product_info(self, barcode_id):
        query = "SELECT * FROM identification WHERE IdentifierValue = %s"
        cursor.execute(query, (barcode_id,))
        resultset = cursor.fetchall()
        
        if resultset:
            asset_id = resultset[0][1]
            query = "SELECT * FROM asset WHERE AssetID = %s"
            cursor.execute(query, (asset_id,))
            asset_info = cursor.fetchone()  
            product_id = asset_info[1]
            assetLocation = asset_info[2]
            assetCondition = asset_info[3]
            dateadded = asset_info[4]
            assetDispatched = asset_info[6]
            print(assetLocation)

            query = "SELECT * FROM product WHERE ProductID = %s"
            cursor.execute(query, (product_id,))
            product_info = cursor.fetchall()
            for row in product_info:
                productName = row[2]
                productCategory = row[3]
                productPrice = row[5]
                print(productName)
                print(productPrice)
            return product_info
        return None

def enhance_roi(roi):
    if roi is None or roi.size == 0:
        print("ROI is empty or invalid. Skipping enhancement.")
        return None
    """Enhance the region of interest (ROI) for better barcode detection."""
    gray = cv2.cvtColor(roi, cv2.COLOR_BGR2GRAY)

    # Increase contrast and brightness (alpha=contrast, beta=brightness)
    enhanced = cv2.convertScaleAbs(gray, alpha=1.5, beta=15)  # Adjust values if needed

    # Apply adaptive thresholding
    enhanced = cv2.adaptiveThreshold(enhanced, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
                                     cv2.THRESH_BINARY, 11, 2)

    return enhanced

def main():
    # Initialize BarcodeDetector
    barcode_detector = BarcodeDetector()
    
    # Initialize OpenCV's barcode detector
    cap = cv2.VideoCapture(0)  # Use the default camera
    if not cap.isOpened():
        print("Error: Could not open video capture device.")
        exit()

    # Set resolution
    cap.set(3, 720)  # Set width to 720 pixels
    cap.set(4, 720)  # Set height to 720 pixels
    
    while True:
        ret, frame = cap.read()
        if not ret:
            print("Failed to capture frame. Exiting.")
            break
    
        # Barcode Detection and Decoding
        barcodes = decode(frame)
        for barcode in barcodes:
            data = barcode.data.decode('utf-8')
            barcode_type = barcode.type
            (x, y, w, h) = barcode.rect  # Get barcode bounding box coordinates

            # Draw a green rectangle around the detected barcode
            cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)

            # Create a text label with barcode data and type
            text = f"{data} ({barcode_type})"
            cv2.putText(frame, text, (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 2)

            # Extract and enhance ROI
            roi = frame[y:y + h, x:x + w].copy()
            enhanced_roi = enhance_roi(roi)

            if roi.size == 0:
                continue
            
            # Decode barcode
            decoded_value = barcode_detector.decode_barcode(enhanced_roi)
            if decoded_value:
                print(f"Decoded Barcode: {decoded_value}")
                cv2.imshow("ROI", enhanced_roi)
                
  ####BARCODE IS UP              
        barcode_detectors = cv2.barcode_BarcodeDetector()
       
  # Detect and decode barcodes
        ret_val, decoded_info, decoded_type, corners = barcode_detectors.detectAndDecodeWithType(frame)

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
                enhanced_roi = enhance_roi(roi)

                # Time the decoding process
                    #start_time = time.time()
                decoded_value = barcode_detector.decode_barcode(enhanced_roi)
                    #end_time = time.time()
                    #decode_time = end_time - start_time

                if decoded_value:
                            # Display the decoded text on the frame
                    text_x = x  # Place text near barcode
                    text_y = y - 10 if y - 10 > 20 else y + 20  # Avoid placing text outside frame

                    cv2.putText(frame, decoded_value, (text_x, text_y), 
                    cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 0, 255), 2)
                    print(f"Decoded from enhanced ROI: {decoded_value}")
                    #print(f"Time taken: {decode_time:.4f} seconds")

                # Ensure we don't show an empty ROI
                #if roi.shape[0] > 0 and roi.shape[1] > 0:
                cv2.imshow("ROI", enhanced_roi)
    #print(f"Decoded from enhanced ROI: {decoded_value}")
   #cv2.imshow("FrameOut", frame)




        # Display output frame
        cv2.imshow("FrameOut", frame)
        
        # Break loop if 'q' is pressed
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
    
    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    main()
