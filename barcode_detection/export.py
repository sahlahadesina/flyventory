import torch
from ultralytics import YOLO
model = YOLO("best.pt")
model.export(format="onnx", dynamic=False, int8=True)