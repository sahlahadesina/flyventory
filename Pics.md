To enable selecting either QR code or barcode detection (but not both at once), you can modify your code to:

Store the user’s choice (choice == "1" for QR, "2" for barcode).

Update decode_codes() to check the type of the detected code and filter out the undesired type based on that choice.

✅ Changes to Make
Add this after the choice = input("Enter 1 or 2: ") line:

python
Copy
Edit
DETECTION_MODE = "QRCODE" if choice == "1" else "BARCODE"
Then, modify your decode_codes() function like this:

python
Copy
Edit
def decode_codes(img, roi, label):
    if roi is None or roi.size == 0:
        print("No valid ROI passed to decode_codes.")
        return None

    decoded = decode(roi)
    print(f"Decoded barcodes: {decoded}")  # Debug output
    if not decoded:
        print(f"No barcodes found in ROI: {roi.shape}")
        return None

    for code in decoded:
        data = code.data.decode('utf-8')
        code_type = code.type.upper()
        if DETECTION_MODE == "QRCODE" and "QR" not in code_type:
            continue
        if DETECTION_MODE == "BARCODE" and "QR" in code_type:
            continue

        (x, y, w, h) = code.rect
        print(f"Detected: {data} ({code_type})")
        cv2.rectangle(img, (x, y), (x + w, y + h), (255, 255, 0), 2)
        cv2.putText(img, f"{data} ({code_type})", (x, y - 10),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 2)
        print(f"{label.capitalize()} Found: {data}")
Summary of What You Achieved
Only QR or barcode codes will be detected and drawn.

This is controlled interactively at program startup.

The user sees printed detections of the selected type only.

Would you like to extend this so the mode can be passed via command line argument instead of input()?
