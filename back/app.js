const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require("body-parser");


app.use(express.json()); // qui gere les requetes entrantes de type json

app.use(express.static('IFC'))

app.use(bodyParser.urlencoded({ // qui gere les requetes entrantes de type formulaire
  extended: true
}));

const corsOptions ={
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}

app.use(cors(corsOptions));

app.get('/', (req,res)=>{
    res.send('hello')
  })
  
  
  
  module.exports = app;