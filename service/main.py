
from fastapi import FastAPI, UploadFile, File
from text_detection import mark_region, extract_text , create_text_object
from fastapi.responses import HTMLResponse
import os


app = FastAPI()

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

    # Supprimer le fichier temporaire
    os.remove(file_path)
    

    return create_text_object(extracted_text)

@app.get("/")
async def hello():
    return 'hello'


@app.post('/file')
async def createFile(file: UploadFile):
    return file.filename

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)