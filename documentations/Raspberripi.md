# Raspberry Pi Documentation

## Table of Contents
1. [Introduction](#introduction)
2. [General Details](#general-details)
3. [Display not Showing Upon Boot Error](#desktop-not-showing-upon-boot-error)
4. [Entering Virtual Environment](#how-to-connect-to-virtual-environment)

---
## Introduction
This document serves as a guide for working with the Raspberry Pi. It includes the errors we encountered and the solutions we implemented to resolve them. Please note that the steps outlined are specific to our project and are not intended as general guidelines. Additionally, we provide details on general settings and the steps we took to accomplish various tasks using our Raspberry Pi.

## General Details
Raspberrypi Name: Ainav  
Password: 1234 (this should be removed when we make the repository public)  
Pi Wi-Fi automatically connects to: Aaminah's Wifi,   
IP Address: (remains same as long as connected to Aaminah's Wifi) 
# Useful Steps for Various Applications
## 1. How to Connect to Virtual Environment
Whenever we want to run a python script, it is best to run it using a virtual environment. A virtual environment helps manage dependencies and isolate project-specific Python packages, preventing conflicts with system-wide installations. Below are the steps to set up and activate a virtual environment.

1. Create a virtual environment named tflite1
   ```sh
   python3 -m venv --system-site-packages tflite1-env
   ```
2. Step 2: Activate the virtual environment
    ```sh
   source tflite1-env/bin/activate
   ```
3. Step 3: Enter the Environment 
    ```sh
   cd tflite1
   ```

## 2.Runnning a Python File 
1. Place your Python file into the environment you created
2. pythonfile.py
3. if it is a notebook, then python pythonnotebook.ipynb

## 3. Installing Different Modules:
### Open CV
   ```sh
 pip install opencv-contrib-python
   ```
### Numpy 
   ```sh
pip install numpy==1.26.4
 ```
### TensorFlow
   ```sh
 pip install tensorflow
 ```
### Pi Camera 
In the configuration file, add the following to the bottom 

```sh
start_x=1
gpu_mem=128
```
Then you do the following in the terminal to install the modules for the camera 
```sh
 sudo apt install libcamera-apps libcamera-dev
```
   ```sh
sudo apt install libcap-dev libatlas-base-dev ffmeg libopenjp2-7
```
   ```sh
sudo apt install libcamera-dev
```

 ```sh
sudo apt install libkms++-dev libfmt-dev libdrm-dev
```

 ```sh
pip install wheel
```

Check if libcamera-hello works after this step, if it does, then just

```sh
pip install rpi-libcamera rpi-kms picamera2
```
If you face errors with the version, you can downgrade the version, using the commands, 
    
```
sudo apt install libcamera0=0.4.0-1~rpt1+rpi50
 ```
    
The continue and install picamera and picamera2

```sh
pip install picamera
```

### QR Code

Installing pyzbra: library used for barcodes and qrcodes
```
pip install pyzbar opencv-python
```
Installing Ultralytics used for YOLO
```
pip install ultralytics
```

## 4. Using the USB Camera 
Below are the steps we used to check if the USB Camera is connected, and test the live feed. 
1. Check if the camera is detected. A list of /dev/video 0 - /dev/video11 should show.
2. List Video Devices with Details. 
```
 v4l2-ctl --list-devices
 ```
This should output something like:
```
USB Camera Name (usb-0000:01:00.0):
    /dev/video0

Other Device Name (platform:...):
    /dev/video1
    /dev/video2
...
```
Look for the device that corresponds to the USB camera, and use that device when capturing frames in python. 

3. Play the live feed of the camera using for example: (you can also use other moder alternatives)

```bash
sudo apt update
sudo apt install mplayer -y
mplayer tv:// -tv driver=v4l2:device=/dev/video1
```
 
## 5. How to activate Raspberry Pi Camera 
1. Install [libcamera modules](#pi-camera)
2. Capture Frames in python using libcamera, Sample Code below. 
   ```python
import libcamera
import cv2
import numpy as np
from picamera2 import Picamera2

# Initialize the camera
picam2 = Picamera2()
picam2.configure(picam2.create_still_configuration())

# Capture an image
frame = picam2.capture_array()

# Convert frame to an OpenCV format
image = cv2.cvtColor(frame, cv2.COLOR_RGB2BGR)

# Save the image
cv2.imwrite("captured_frame.jpg", image)

# Display the image (optional)
cv2.imshow("Captured Frame", image)
cv2.waitKey(0)
cv2.destroyAllWindows()
```

## 6 Connecting the Ailiensense camera 

# Error Logs 

## 1. Desktop Not Showing Upon Boot Error 

- **Date & Time:** 
- **Issue:** Upon Boot, the raspberry pi loads a text console instead of the desktop screen, This makes it difficult to access Chromium and upload code to our raspberry pi. We also notice that once we reboot, lighdm fails to load as well. 
- **Cause:** Not Sure, Error feels random, raspberry pi was working normallya  few months ago.
- **Fix Attempts:**  
  - **Attempt 1:** Start x → [Failed] : (X started but upon reboot console still shows)
  - **Attempt 2:** Reinstall lightdm → [Failed]  : (lightdm reinstalls and reconfigure but lightdm still fails to load)
  - **Attempt 3:** Change display settings in raspiconfig file → [Failed] : (console still shows upon boot)
  - **Attempt 4:** Changing the boot setting from raspi configuration  → [Failed] : (despite changed setting, console still shows upon boot)
  - **Attempt 5:** Try to reinstall Plymouth → [Failed]  :(had a difficult time reinstalling Plymouth)

- **Solution:** Formatting the SD Card and reinstalling the imager.
- **Notes:** 



## 2. Common Errors we Run to Repeatedly 
1.   `  **
2.   **



