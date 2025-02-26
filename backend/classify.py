def classify_text(text):
    keywords = {
        "invoice": ["invoice", "amount", "total", "payment"],
        "contract": ["agreement", "party", "contract", "terms"],
        "resume": ["experience", "skills", "education", "profile"]
    }

    for category, words in keywords.items():
        if any(word in text.lower() for word in words):
            return category

    return "unknown"
