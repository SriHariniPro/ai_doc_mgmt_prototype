import os
import logging
import pytesseract
from flask import Flask, request, jsonify, send_from_directory
from werkzeug.utils import secure_filename
from PIL import Image
from flask_cors import CORS

# Configure Logging
logging.basicConfig(level=logging.INFO)

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}  # Temporarily removed 'pdf'

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def extract_text(filepath):
    try:
        text = pytesseract.image_to_string(Image.open(filepath))
        return text[:500] + '...'  # First 500 characters for preview
    except Exception as e:
        logging.error(f"Error extracting text: {e}")
        return str(e)

@app.route('/')
def home():
    return jsonify({'message': 'AI Document Management API is running'}), 200

@app.route('/upload', methods=['POST'])
def upload_file():
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file provided'}), 400

        file = request.files['file']
        if not file or file.filename == '':
            return jsonify({'error': 'No selected file'}), 400

        if not allowed_file(file.filename):
            return jsonify({'error': 'Unsupported file type'}), 400

        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)

        extracted_text = extract_text(filepath)

        return jsonify({
            'filename': filename,
            'text': extracted_text,
            'metadata': {
                'size': os.path.getsize(filepath),
                'type': file.content_type
            }
        }), 200

    except Exception as e:
        logging.error(f"Upload error: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/documents', methods=['GET'])
def list_documents():
    files = os.listdir(app.config['UPLOAD_FOLDER'])
    return jsonify([{'name': f, 'url': f"/uploads/{f}"} for f in files])

@app.route('/uploads/<filename>', methods=['GET'])
def get_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

if __name__ == '__main__':
    with app.app_context():
        if not os.path.exists(UPLOAD_FOLDER):
            os.makedirs(UPLOAD_FOLDER)
    app.run(host='0.0.0.0', port=5000, debug=True)
