const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');
const fileRoutes = require('./routes/files')
const castingRoutes = require('./routes/castings')
const orderRoutes = require('./routes/order')
const userRoutes = require('./routes/users')
const agendaRoutes = require('./routes/agenda')
const eventRoutes = require('./routes/Event')
const detectionRoutes = require('./routes/detection')
const predictionRoutes = require('./routes/prediction')
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
require("dotenv").config();

app.use(helmet());
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minuts
  max: 100, // Limits the number of requests to 100 per IP during the specified window
});
app.use(limiter);

app.use(express.json()); // which handles incoming json type requests.
app.use(cookieParser()); // handling cookies
app.use(helmet()); //Using Helmet middleware to enhance HTTP header security

app.use(express.static('IFC'))//which manages the folder for uploading files.

app.use(bodyParser.urlencoded({ // which handles incoming form-type requests.
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
app.use('/api' ,detectionRoutes)
app.use('/api' , predictionRoutes)
app.get('/', (req, res)=>{
  res.send('hello')
})




  
  
  module.exports = app;