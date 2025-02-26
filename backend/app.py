import os
import pytesseract
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
from PIL import Image
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'pdf', 'docx'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def extract_text(filepath):
    try:
        text = pytesseract.image_to_string(Image.open(filepath))
        return text[:500] + '...'  # Return first 500 chars for demo
    except Exception as e:
        return str(e)

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        save_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(save_path)
        
        # Process document
        extracted_text = extract_text(save_path)
        
        return jsonify({
            'filename': filename,
            'text': extracted_text,
            'metadata': {
                'size': os.path.getsize(save_path),
                'type': file.content_type
            }
        }), 200
    
    return jsonify({'error': 'File type not allowed'}), 400

@app.route('/documents', methods=['GET'])
def list_documents():
    # Demo data - replace with actual implementation
    return jsonify([
        {
            'id': 1,
            'name': 'sample.pdf',
            'tags': ['contract', 'legal'],
            'preview': 'Lorem ipsum...'
        }
    ])

if __name__ == '__main__':
    os.makedirs(UPLOAD_FOLDER, exist_ok=True)
    app.run(host='0.0.0.0', port=5000)
