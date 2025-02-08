# Raspberry Pi Documentation

## Table of Contents
1. [Introduction](#introduction)
2. [General Details](#general-details)
3. [Display not Showing Upon Boot Error](#display-not-showing-error)
4. [Entering Virtual Environment](#virtual-environment)

---
## Introduction
This document serves as a guide for working with the Raspberry Pi. It includes the errors we encountered and the solutions we implemented to resolve them. Please note that the steps outlined are specific to our project and are not intended as general guidelines. Additionally, we provide details on general settings and the steps we took to accomplish various tasks using our Raspberry Pi.

## General Details
Raspberrypi Name: Ainav  
Password: 1234 (this should be removed when we make the repository public)  
Pi Wi-Fi automatically connects to: Aaminah's Wifi,   
IP Address: (remains same as long as connected to Aaminah's Wifi) 

## Display Not Showing Error 

- **Date & Time:** 
- **Issue:** Upon Boot, the raspbery pi loads a text console instead of the desktop screen, This makes it difficult to access chromium and upload code to our raspberry pi. 
- **Cause:** Not Sure, Error feels random, raspbery pi was working normally few months ago.
- **Fix Attempts:**  
  - **Attempt 1:** Start x → [Failed]  
  - **Attempt 2:** Reinstall lightdm → [Failed]  
  - **Attempt 3:** Change display settings in raspiconfig file → [Failed]
  - **Attempt 4:** Chnage display settings in raspiconfig file → [Failed]
  - **Attempt 5:** Chnage display settings in raspiconfig file → [Failed]  


- **Solution:** Formatting the SD Card and reinstalling the imager.
- **Notes:** [Any useful insights for future reference]  


## Virtual Environment
Describe the system architecture and provide diagrams where necessary. Explain how different components interact.

## Installation Guide
### Prerequisites
- List required software, hardware, or tools.
- Mention any dependencies to be installed beforehand.

### Steps to Install
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/project.git
   ```
2. Navigate to the project directory:
   ```sh
   cd project
   ```
3. Install required dependencies:
   ```sh
   pip install -r requirements.txt  # Example for Python projects
   ```
4. Run setup commands (if any):
   ```sh
   ./setup.sh
   ```

## How to Use
Provide instructions on how to use the project, including command-line usage, GUI navigation, or API calls.

## Configuration Settings
Explain configurable options, such as environment variables and configuration files.


## Contribution Guidelines
Explain how others can contribute, including coding standards, issue reporting, and pull request procedures.

## License & Legal
Specify the license (e.g., MIT, Apache 2.0) and include a link to the full license text.

