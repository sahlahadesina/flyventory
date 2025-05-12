# **Step by Step Guide for Setting Up a Custom Object Detection Model on Raspberry Pi with IMX500 Camera**

This guide will walk you through the process of setting up a custom object detection model using the **Raspberry Pi IMX500 AI Camera** and deploying your trained YOLOv8 model.

The following resources were used:
- https://developer.aitrios.sony-semicon.com/en/raspberrypi-ai-camera/documentation/imx500-converter?version=3.16.1&progLang=
- https://developer.aitrios.sony-semicon.com/en/raspberrypi-ai-camera/develop/ai-tutorials/prepare-and-deploy-ai-models-tutorial?version=2024-11-21&progLang=#_compile_with_imx500_converter
## **Workflow**
![image](https://github.com/user-attachments/assets/661ff0cd-0568-4a17-864f-1f86e8a7894a)

# IMX500 Object Detection on Raspberry Pi

This guide walks you through the process of deploying an object detection model (trained with YOLOv5 or similar) onto a Raspberry Pi with the Sony IMX500 sensor, including quantization and conversion to `.rpk` format for deployment.

---
## Steps

### 1. Train and Export Your Model
- Train your object detection model using your preferred framework (e.g., YOLOv5).
- Once training is complete, export the model as `best.pt`.

### 2. Prepare Validation Dataset and Configuration
- Ensure you have a `data.yaml` file configured for your dataset.
- Collect a validation set with **at least 100-300 images**.
- This validation set will be used during quantization.

### 3. Upload to Google Drive and Transfer to Raspberry Pi
- Upload `best.pt`, `data.yaml`, and your validation set to Google Drive.
- Make the shared link public.
- On the Raspberry Pi, open the link and download the dataset.

### 4. Quantize and Convert Model on Raspberry Pi
- On the Raspberry Pi, run the converter script to **quantize** and **convert** the model to IMX format.

### 5. Locate the Output Folder
- After conversion, you’ll obtain a folder named `best_imx`.
- Inside it, locate `packagerOut.zip`.

### 6. Extract `.zip` to `.rpk` Format
Use the following command:

```bash
imx500-package -i path/to/packagerOut.zip -o path/to/output/folder
```
### 7. Install PiCamera2
Clone and install picamera2:

```bash
git clone https://github.com/raspberrypi/picamera2
cd picamera2
pip install -e . --break-system-packages
```
### 8. Run the Object Detection Demo
Use this command to start inference:

```bash
python imx500_object_detection_demo.py \
  --model path/to/network.rpk \
  --fps 17 \
  --bbox-normalization \
  --labels path/to/labels.txt
```
- labels.txt is found inside the best_imx folder.
- network.rpk is the model file generated in Step 6.

### 9. Customize the Detection Code
If you'd like to extend or customize the object detection behavior (e.g., trigger actions on detection), modify the imx500_object_detection_demo.py script directly.
