const express = require('express');
const axios = require('axios');
const fs = require('fs');
const fa = require('fs').promises;
const FormData = require('form-data');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
require("dotenv").config();


exports.detectionTextOnFile = async (req, res) => {
    try {
      const filePath = `images/${req.file.filename}`;
  
      const formData = new FormData();
      formData.append('image', fs.createReadStream(filePath));
  
      const response = await axios.post(
        `${process.env.DETECTION_SERVICE}/detect-text`,
        formData,
        {
          headers: formData.getHeaders(), // Utilisation de la méthode getHeaders() pour définir les en-têtes appropriés
        }
      );
        
      await fa.unlink(filePath);
      res.status(200).send(response.data);
    } catch (err) {
      console.error(err);
      res.status(500).send('Erreur serveur');
    }
  };