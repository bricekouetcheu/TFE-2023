

const multer = require('multer');
const fs = require('fs');

const FILE_TYPES = {
  'application/octet-stream': 'ifc',
  'application/pdf': 'pdf',
  'image/jpeg': 'jpg', // Ajout de la gestion des images JPEG
  'image/png': 'png' , 
  'image/jpg': 'jpg'  // Ajout de la gestion des images PNG
};

// Configuration de multer pour les téléchargements d'images
const imageStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    const { name, address } = req.body;
    const folder = `images/`; // Dossier où nous allons télécharger les images

    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }
    callback(null, folder);
  },
  filename: (req, file, callback) => {
    file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8');
    const fileName = file.originalname.split(' ').join('_');
    const extension = FILE_TYPES[file.mimetype];

    callback(null, fileName);
  }
});

const ifcstorage = multer.diskStorage({

    encoding: 'utf-8', 
    destination:(req, file,callback)=>{ //
        const {name, address } = req.body;
        const folder = `IFC/${name}/` //folder where we are going to upload files

        if(!fs.existsSync(folder)){ // create folder if it doesn't exist
            fs.mkdirSync(folder, { recursive: true });
        }
        callback(null, folder)

    },
    filename: (req, file, callback)=>{
        file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8');
        const file_name = file.originalname.split(' ').join('_');
        const extension = FILE_TYPES[file.mimetype];

            callback(null, file.originalname) 
        


    },
    
})

module.exports = {imageStorage, ifcstorage};
