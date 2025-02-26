FROM mcr.microsoft.com/devcontainers/python:3.9

RUN apt-get update && apt-get install -y tesseract-ocr && apt-get clean

WORKDIR /workspace
COPY requirements.txt /workspace/
RUN pip install --no-cache-dir -r requirements.txt
