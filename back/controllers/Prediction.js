const express = require('express');
const axios = require('axios');
const multer = require('multer');
require("dotenv").config();


exports.getPrediction = async(req, res)=>{
    const data = req.body 
        
        try{
            const response = await axios.post(data)

            const data = response.data

            res.status(200).send(data)

        }catch(err){
            console.log(err)
            res.status(500).send('erreur serveur')
        }
    
}