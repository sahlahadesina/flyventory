# **Step by Step Guide for Setting Up a Custom Object Detection Model on Raspberry Pi with IMX500 Camera**

This guide will walk you through the process of setting up a custom object detection model using the **Raspberry Pi IMX500 AI Camera** and deploying your trained YOLOv8 model.

The following resources were used:
- https://developer.aitrios.sony-semicon.com/en/raspberrypi-ai-camera/documentation/imx500-converter?version=3.16.1&progLang=
## **Workflow**
![image](https://github.com/user-attachments/assets/661ff0cd-0568-4a17-864f-1f86e8a7894a)

## **Prerequisites**
- Raspberry Pi 4 with Raspberry Pi OS installed
- IMX500 camera connected to Raspberry Pi
- Custom-trained YOLOv8 model (`best.pt`)
- Basic knowledge of using the terminal

## **1. Convert the YOLOv8 Model to ONNX Format**
We need to convert the YOLOv8 model from the PyTorch format (`best.pt`) to the ONNX format before proceeding. This conversion is done with **quantization** to ensure compatibility with the IMX500 camera.

Run the following Python code to export the model to ONNX format with quantization enabled:

```python
import torch
from ultralytics import YOLO
```
### Load the trained model
```python
model = YOLO("best.pt")
```
### Export to ONNX with quantization (int8)
```python
model.export(format="onnx", dynamic=False, int8=True)
```

## **2. Install IMX500 Converter and Model Compression Toolkit (MCT)**

### Install IMX500 Converter
To convert the ONNX model to a format suitable for the IMX500 camera, we need to install the IMX500 Converter.

Install it using the following command:

```bash
pip install imx500-converter[pt]
```
### Install Model Compression Toolkit (MCT)

The Model Compression Toolkit (MCT) is needed for quantization. However, it requires TensorFlow/Keras, and since we’ve already quantized the model during the ONNX export, this step is optional.

To install MCT, use:

```bash
pip install model-compression-toolkit
```
## **3. Convert the ONNX Model Using IMX500 Converter**

Now that we have our `best.onnx` file, we will convert it using the IMX500 Converter.

Run the following command to convert the model:

```bash
imxconv-pt -i best.onnx -o model_output --no-input-persistency
```
### Explanation of flags:

*   `-i`: Path to your quantized ONNX model (`best.onnx`)
*   `-o`: Output directory where the converted model will be stored (you can specify any folder)

The output from the converter will be a `packerOut.zip` file, which contains the model ready for deployment.

## **4. Unzip the Output File**

Once the conversion is complete, unzip the `packerOut.zip` file:

```bash
unzip packerOut.zip
```
## **5. Install the Aitrios SDK on the Raspberry Pi**

To integrate the IMX500 camera with your custom model, you need to install the Aitrios SDK.

### Clone the SDK Repository

```bash
git clone https://github.com/SonySemiconductorSolutions/aitrios-sdk-vision-sensing-app.git
```
### Install Dependencies

Navigate to the cloned repository:

```bash
cd aitrios-sdk-vision-sensing-app
```
Install the required dependencies:

```bash
pip3 install -r requirements.txt
```
Install the SDK
```bash
python3 setup.py install
```
## **6. Test the Camera**

After installing the SDK, test the IMX500 camera by running:

```bash
picamera2 -t 1000
```
## **7. Deploy the Model on IMX500 Camera***

Now that the SDK is installed, and your model is ready, deploy the model to the IMX500 camera:

```bash
aitrios-cli deploy --model /home/pi/packerOut.zip
```
## **8. Modify Your Code for Inference**

Finally, modify your existing Python code to start running inferences using the IMX500 camera. The camera will process frames using the custom model you just deployed, and you can get results directly from the camera in real time.

---

## Additional Notes

- Ensure that you are using a fully quantized model to avoid errors during conversion.
- If you encounter any issues with the MCT, you can skip that step and continue with the ONNX conversion.
- If you have any custom modifications to the object detection code, make sure they align with the model deployment on the IMX500 camera.
