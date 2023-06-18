const multer  = require('multer')
const fs = require('fs')


const FILE_TYPES= {
    "application/octet-stream": 'ifc',
    "application/pdf": 'pdf'
}

//multer configuration

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

module.exports = {ifcstorage };
