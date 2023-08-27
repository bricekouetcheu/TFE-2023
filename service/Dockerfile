FROM python:3.9-slim
# add curl for healthcheck
# Ajouter curl pour healthcheck
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
    curl \
    && rm -rf /var/lib/apt/lists/*

RUN apt-get update && apt-get install -y \
    ffmpeg \
    libsm6 \
    libxext6 \
    tesseract-ocr \
    tesseract-ocr-fra


# 
WORKDIR /code
# 
COPY ./requirements.txt /code/requirements.txt

# 
RUN pip3 install -r /code/requirements.txt

# 
COPY ./app /code/app


# 
WORKDIR /code/app

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8001", "--reload"]
