import onnx

# Load your ONNX model
model_path = "C:/Users/hp/Desktop/Github/flyventory/best_op15_simplified.onnx"
model = onnx.load(model_path)

# Check if the model is valid
onnx.checker.check_model(model)
print("Model is valid!")
