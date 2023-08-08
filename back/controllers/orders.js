
const axios = require('axios');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;
const { OAuth2Client, UserRefreshClient } = require('google-auth-library')
require("dotenv").config();
const axiosInstance = axios.create()
const jwt = require('jsonwebtoken');
const pool = require('../db.js');
const { PDFDocument, rgb } = require('pdf-lib');
const pdfMake = require('pdfmake');
const nodemailer = require("nodemailer");
const MailComposer = require("nodemailer/lib/mail-composer");
const process = require('process');

function streamToString (stream) {
    const chunks = [];
    return new Promise((resolve, reject) => {
      stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
      stream.on('error', (err) => reject(err));
      stream.on('end', () =>     resolve(Buffer.concat(chunks).toString('utf8')));
    })
   }

const generatePDFBuffer = async(data) => {
    
  const fonts = {
    Roboto: {
      normal: 'fonts/Roboto-Regular.ttf',
      bold: 'fonts/Roboto-Bold.ttf',
      italics: 'fonts/Roboto-Italic.ttf',
      bolditalics: 'fonts/Roboto-BoldItalic.ttf'
    },
  };

  const printer = new pdfMake(fonts);

  const docDefinition = {
    content: [
        { text: 'Bon de Commande', style: 'header' },
        { text: new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }), style: 'date' },
        '\n', // Add a blank line
        {
          table: {
            headerRows: 1,
            widths: ['*', '*'],
            body: [
              ['EXIGENCES', 'RESULTATS'],
              ...Object.entries(data).map(([key, value]) => [key, value || '-']),
            ],
          },
          layout: 'lightHorizontalLines', // Add light horizontal lines to the table
        },
      ],
      styles: {
        header: {
          fontSize: 13,
          bold: true,
          alignment: 'center',
          marginBottom: 20,
        },
        date: {
          fontSize: 9,
          alignment: 'right',
        },
      },
    };
    const pdfDoc = printer.createPdfKitDocument(docDefinition);

    const chunks = [];
    pdfDoc.on('data', (chunk) => {
      chunks.push(chunk);
    });
  
    // Utilisation d'une promesse pour attendre la fin du traitement
    const pdfBuffer = await new Promise((resolve, reject) => {
      pdfDoc.on('end', () => {
        const pdfBuffer = Buffer.concat(chunks);
        resolve(pdfBuffer);
      });
      pdfDoc.end();
    });
  
    return pdfBuffer;
};



const oauth2Client = new OAuth2(
    process.env.GOOGLE_ID_CLIENT,
    process.env.GOOGLE_CLIENT_SECRET,
    'postmessage'
);





// refreshToken function
const refreshAccessToken = async(refreshToken)=>{
    try{
        const user = new UserRefreshClient(
            process.env.GOOGLE_ID_CLIENT,
            process.env.GOOGLE_CLIENT_SECRET, 
            refreshToken)
  
        const {credentials} = await user.refreshAccessToken()
        const newAccessToken = credentials.access_token
  
        return newAccessToken
    }
  catch(err){
    console.log(err)
  }
  
  }
  


  
  //get if accessToken is still valid
  
  const checkAccessToken = (token)=>{
    
    const decodedToken = jwt.decode(token)
  
    if(!decodedToken || !decodedToken.exp ){
      return true
    }
  
    const expiration = decodedToken.exp * 1000;
    const currentDate = Date.now()
    const isExpired =  expiration <= currentDate;
  
    return isExpired
  
  }





exports.AddNewOrder = async(req,res)=>{
    try{
        
        const casting_id = req.params['casting_id']
        const orderData = req.body
       
        const pdfBytes = await generatePDFBuffer(orderData)
        const destinationEmail = 'he201902@students.ephec.be'
        console.log('test1',pdfBytes)
      

        //checking if castings exists
        const castingExists = await pool.query('SELECT * FROM castings WHERE casting_id = $1', [casting_id]);
        if (castingExists.rows.length === 0) {
          return res.status(404).json({ message: 'Le casting_id spécifié n\'existe pas.' });
        }

        //getting email address user
        const getUserEmailQuery = `
          SELECT u.user_email, u.access_token, u.refresh_token
          FROM users u
          JOIN projects p ON u.user_id = p.user_id
          JOIN castings c ON p.project_id = c.project_id
          WHERE c.casting_id = $1;
          
          `


        const response =  await pool.query(getUserEmailQuery, [casting_id])
        const { user_email, access_token, refresh_token } = response.rows[0];

    

        const isAccessTokenIsExpired = checkAccessToken(access_token);
        if (isAccessTokenIsExpired) {
            const newAccessToken = await refreshAccessToken(refresh_token);
            oauth2Client.setCredentials({
                access_token: newAccessToken // Remplacez par le véritable access_token de l'utilisateur
            });

                // Utilisation de l'API Gmail pour envoyer un e-mail
        const gmail = google.gmail({
            version: 'v1',
            auth: oauth2Client
        });
        const messagePayload = {
            subject: "Nouvelle commande créée",
            to: destinationEmail, // Remplacez par l'adresse e-mail de destination
            from: user_email,
            attachments: [{ filename: 'commande.pdf', content: pdfBytes }],
        };

        const mail = new MailComposer(messagePayload);
        const stream = mail.compile().createReadStream();
        const messageResult = await streamToString(stream);
        const encodedMessage = Buffer.from(messageResult).toString('base64')
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');
    
        const result = await gmail.users.messages.send({
            userId: 'me',
            requestBody: {
                raw: encodedMessage,
            },
        });
    
        console.log(result.data);
     
        // Préparer le message
       /* const destinationEmail = 'he201902@students.ephec.be'
        const rawMessage = `From: Votre Adresse Email <votre_adresse_email@gmail.com>\r\n` +
            `To: ${destinationEmail}\r\n` +
            `Subject: Nouvelle commande créée\r\n\r\n` +
            `Une nouvelle commande a été créée pour le casting `;

        const encodedMessage = Buffer.from(rawMessage)
            .toString('base64')
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');

        // Envoyer le message
        await gmail.users.messages.send({
            userId: 'me',
            requestBody: {
                raw: encodedMessage,
                attachments: [
                    {
                        filename: 'commande.pdf',
                        content: pdfBytes.toString('base64'), 
                    },
                ],
            },
        });*/



        
    } else{
            oauth2Client.setCredentials({
                access_token:  access_token // Remplacez par le véritable access_token de l'utilisateur
            });

                // Utilisation de l'API Gmail pour envoyer un e-mail
        const gmail = google.gmail({
            version: 'v1',
            auth: oauth2Client
        });

        // Préparer le message
        const messagePayload = {
            subject: "Nouvelle commande créée",
            to: destinationEmail, // Remplacez par l'adresse e-mail de destination
            from: user_email,
            attachments: [{ filename: 'commande.pdf', content: pdfBytes }],
        };

        const mail = new MailComposer(messagePayload);
        const stream = mail.compile().createReadStream();
        const messageResult = await streamToString(stream);
        const encodedMessage = Buffer.from(messageResult).toString('base64')
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');
    
        const result = await gmail.users.messages.send({
            userId: 'me',
            requestBody: {
                raw: encodedMessage,
            },
        });
    
        console.log(result.data);

      /*  const destinationEmail = 'he201902@students.ephec.be'
        const rawMessage = `From: Votre Adresse Email <votre_adresse_email@gmail.com>\r\n` +
            `To: ${destinationEmail }\r\n` +
            `Subject: Nouvelle commande créée\r\n\r\n` +
            `Une nouvelle commande a été créée pour le casting `;

        const encodedMessage = Buffer.from(rawMessage)
            .toString('base64')
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');

        // Envoyer le message
        const response = await gmail.users.messages.send({
            userId: 'me',
            requestBody: {
                raw: encodedMessage,
                attachments: [
                    {
                        filename: 'commande.pdf',
                        content : pdfBytes,
                    },
                ],
            },
        });*/

  
    } 

   //adding new order
    const AddNewOrderQuery = ('INSERT INTO Orders (order_data, casting_id) VALUES ($1, $2) RETURNING *')
    const result = await pool.query(AddNewOrderQuery, [orderData, casting_id])
    res.status(201).send('Nouvelle commande créee')       
       
    }
    catch (err){
        console.log(err)
        res.status(500).json({ message: 'erreur serveur' });
    }
}













exports.getOneOrder = async(req, res)=>{

    try{
        const casting_id = req.params['casting_id']

        const getOneOrderQuery = 'select order_data from Orders where casting_id = $1'
    
        const result = await pool.query(getOneOrderQuery,[casting_id])
        const data = result.rows[0]
    
        res.status(200).send(data)

    }catch(err){
        console.log(err)
        res.status(500).send('Erreur serveur')

    }
    

}