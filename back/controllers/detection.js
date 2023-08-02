const express = require('express');
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
require("dotenv").config();


exports.detectionTextOnFile = async (req, res)=>{
    const imageFile = req.files; 
 

    try{

        const formData = new FormData();
        const bufferData = Buffer.from(imageFile.image.data);

        formData.append('image',  bufferData , {
            filename: imageFile.image.name,
            contentType: imageFile.image.mimetype,
          });
        const response = await axios.post(process.env.DETECTION_SERVICE+`/detect-text` , formData,
        {
            headers:{
                'Content-Type': 'multipart/form-data',
            },
          }
    )

    res.status(200).send(response.data)

    }catch(err){
        console.log(err)
        res.status(500).send('erreur serveur')

    }

}