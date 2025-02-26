import pytesseract
from PIL import Image
import pdf2image

def extract_text(filepath):
    if filepath.endswith(".pdf"):
        images = pdf2image.convert_from_path(filepath)
        text = " ".join([pytesseract.image_to_string(img) for img in images])
    else:
        img = Image.open(filepath)
        text = pytesseract.image_to_string(img)

    return text.strip()
