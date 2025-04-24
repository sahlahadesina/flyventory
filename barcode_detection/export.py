from ultralytics import YOLO

model = YOLO("best.pt")
model.export(format="imx", data="data.yaml")
##