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

## Desktop Not Showing Upon Boot Error 

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


## How to Connect to Virtual Environment
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

## Runnning a Python File 
1. Place your Python file into the environment you created
2. pythonfile.py 

## Installing Different Modules:
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

 sudo apt install libcamera-apps libcamera-dev

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

```sh
pip install rpi-libcamera rpi-kms picamera2
```
If you face errors with the version, you can dowgrade the version, using the commands, 



```sh
pip install picamera
```


## Runnning a Python File 

## How to activate Raspberi Pi Camera 

## Connecting the Ailiensense camera 
