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
const agendaRoutes = require('./routes/agenda')
const eventRoutes = require('./routes/Event')
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
require("dotenv").config();


app.use(express.json()); // qui gere les requetes entrantes de type json.
app.use(cookieParser()); // qui s'occupe des cookies.

app.use(express.static('IFC'))//qui gere le folder pour l'upload des fichiers.

app.use(bodyParser.urlencoded({ // qui gere les requetes entrantes de type formulaires.
  extended: true
}));
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Express API for JSONPlaceholder',
    version: '1.0.0',
  },
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./routes/*.js'],
};
const swaggerSpec = swaggerJSDoc(options);

const corsOptions ={
  origin: process.env.FRONTEND_HOST,
  credentials: true,           //access-control-allow-credentials:true
  optionSuccessStatus:200
}

app.use(cors(corsOptions));

app.use('/docs', swaggerUi.serve);
app.get('/docs',swaggerUi.setup(swaggerSpec) )
//API routes
app.use('/api',authRoutes);
app.use('/api',projectRoutes);
app.use('/api',fileRoutes);
app.use('/api',castingRoutes);
app.use('/api',orderRoutes);
app.use('/api',userRoutes);
app.use('/api' ,agendaRoutes)
app.use('/api' ,eventRoutes)



app.get('/', (req,res)=>{
    res.send('hello')
  })
  
  
  
  module.exports = app;