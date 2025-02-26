from flask import Flask, request, jsonify
import pytesseract
from PIL import Image
import os
from ocr import extract_text
from classify import classify_text

app = Flask(__name__)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route("/")
def home():
    return jsonify({"message": "AI Document Management System Backend is running!"})

@app.route("/upload", methods=["POST"])
def upload_file():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400
    
    file = request.files["file"]
    filepath = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(filepath)

    text = extract_text(filepath)
    category = classify_text(text)

    return jsonify({"text": text, "category": category})

if __name__ == "__main__":
    app.run(debug=True)
