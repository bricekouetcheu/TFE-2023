
from fastapi import FastAPI, UploadFile, File
from text_detection import mark_region, extract_text , create_text_object
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
import os
import re


app = FastAPI()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/detect-text")
async def detect_text(image: UploadFile = File(...)):
    print('test',image.filename)  # Vérifier le nom du fichier
    # Enregistrer l'image dans un fichier temporaire
    file_path = f"./temp/{image.filename}"
    with open(file_path, "wb") as buffer:
        buffer.write(image.file.read())

    # Effectuer la détection de texte
    marked_image, line_items_coordinates = mark_region(file_path)
    extracted_text = extract_text(file_path, line_items_coordinates)
    result_text =  create_text_object(extracted_text)

    filtered_text = []

    expressions = [r"Classe de resistance", r"Classe\(s\)", r"Classe de consistance", r"Dmax", r"Heure chargement"]
    for line in result_text['lines']:
        if any(re.search(expression, line) for expression in expressions ):
            filtered_text.append(line)

    # Supprimer le fichier temporaire
    os.remove(file_path)
    

    return filtered_text

@app.get("/")
async def hello():
    return 'hello'


@app.post('/file')
async def createFile(file: UploadFile):
    return file.filename

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)