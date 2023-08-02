const express = require('express');
const axios = require('axios');
const multer = require('multer');
require("dotenv").config();


exports.getPrediction = async(req, res)=>{
    const data = req.body 
    console.log(req.body)
    
    const target = 20
        
        try{
            const response = await axios.post(process.env.PREDICTION_SERVICE, data)

            res.status(200).send(response.data)

        }catch(err){
            console.log(err)
            res.status(500).send('erreur serveur')
        }
    
}