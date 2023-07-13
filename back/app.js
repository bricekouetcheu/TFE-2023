const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth');
const projectRoutes =require('./routes/projects');
const fileRoutes = require('./routes/files')
const castingRoutes = require('./routes/castings')
const orderRoutes = require('./routes/order')
const userRoutes = require('./routes/users')


app.use(express.json()); // qui gere les requetes entrantes de type json.
app.use(cookieParser()); // qui s'occupe des cookies.

app.use(express.static('IFC'))//qui gere le folder pour l'upload des fichiers.

app.use(bodyParser.urlencoded({ // qui gere les requetes entrantes de type formulaires.
  extended: true
}));

const corsOptions ={
  origin: 'http://localhost:3000',
  credentials: true,           //access-control-allow-credentials:true
  optionSuccessStatus:200
}

app.use(cors(corsOptions));

//API routes
app.use('/api',authRoutes);
app.use('/api',projectRoutes);
app.use('/api',fileRoutes);
app.use('/api',castingRoutes);
app.use('/api', orderRoutes);
app.use('/api', userRoutes);



app.get('/', (req,res)=>{
    res.send('hello')
  })
  
  
  
  module.exports = app;