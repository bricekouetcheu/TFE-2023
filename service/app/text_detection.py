import cv2
import pytesseract
from PIL import Image
import matplotlib.pyplot as plt

# Chemin vers le fichier Tesseract OCR 
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\tess\tesseract.exe'


def mark_region(image_path):
    im = cv2.imread(image_path)
    gray = cv2.cvtColor(im, cv2.COLOR_BGR2GRAY)
    blur = cv2.GaussianBlur(gray, (9, 9), 0)
    thresh = cv2.adaptiveThreshold(blur, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY_INV, 11, 30)

    # Dilate to combine adjacent text contours
    kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (9, 9))
    dilate = cv2.dilate(thresh, kernel, iterations=4)

    # Find contours, highlight text areas, and extract ROIs
    cnts, _ = cv2.findContours(dilate, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    line_items_coordinates = []

    # Créer une seule région qui couvre toute l'image
    line_items_coordinates.append([(0, 0), (im.shape[1], im.shape[0])])

    # Marquer la région sur l'image
    cv2.rectangle(im, (0, 0), (im.shape[1], im.shape[0]), color=(255, 0, 255), thickness=3)

    return im, line_items_coordinates


def extract_text(image_path, line_items_coordinates):
    

    for coordinates in line_items_coordinates:
        img = Image.open(image_path).crop((coordinates[0][0], coordinates[0][1], coordinates[1][0], coordinates[1][1]))

        # Convertir l'image en noir et blanc pour une meilleure reconnaissance optique des caractères (OCR)
        img = img.convert('L')

        # Utiliser Tesseract pour extraire le texte de l'image
        custom_oem_psm_config = r'--psm 4'
        text = pytesseract.image_to_string(img, lang='fra', config='--psm 6')
        

    return text


def create_text_object(text):
    lines = text.split('\n')
    return {'lines': lines}
