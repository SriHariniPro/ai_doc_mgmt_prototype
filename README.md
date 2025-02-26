# AI Document Management System

## Setup

1. **Prerequisites**:
   - GitHub Codespace
   - Node.js 16+
   - Python 3.8+

2. **Backend Setup**:
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   sudo apt-get install tesseract-ocr  # For OCR processing
   flask run
