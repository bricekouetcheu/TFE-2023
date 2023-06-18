const pool = require('../db.js') ;
const path = require('path');
const fs = require('fs');



exports.GetIfcProject = (req, res) => {
    const project_id = req.params.project_id;
    const project_id_int = parseInt(project_id, 10);

    // Obtenir le nom du projet depuis la base de données
    pool.query('SELECT project_name FROM projects WHERE project_id = $1', [project_id_int])
        .then(result => {
            const row = result.rows;
            const project_name = row[0].project_name;

            const directoryPath = path.join(__dirname, `../IFC/${project_name}`);
            fs.readdir(directoryPath, (err, files) => {
                if (err) {
                    console.log(err);
                    res.status(500).send({ message: "No files found" });
                } else {
                    if (files.length === 1 && fs.lstatSync(path.join(directoryPath, files[0])).isFile()) {
                        // Vérifier si un seul fichier est trouvé dans le répertoire
                        const ifcFile = files[0];
                        const filePath =  path.join(__dirname,`../IFC/${project_name}/${ifcFile}` );

                        fs.readFile(filePath, (err, file)=>{
                            if(err){
                                console.log(err);
                                res.status(500).send('no ifc files found for this project')
                            }
                    
                            res.status(200).send(file)
                    
                        })
                        
                    } else {
                        res.status(404).send({ message: "File not found or multiple files found" });
                    }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).send(err);
        });
};



exports.GetIfcfiles = (req, res)=>{
   
    const fileName = req.params['fileName']
    const project_id = req.params['project_id']
    const project_id_int = parseInt(project_id,10)
   

    


    pool.query('select project_name from projects where project_id = $1',[project_id_int])

    .then(result=>{
        const row = result.rows

        const project_name = row[0].project_name
        

        const directoryPath = path.join(__dirname,`../IFC/${project_name}/${fileName}` );
        
        fs.readFile(directoryPath, (err, file)=>{
            if(err){
                console.log(err);
                res.status(500).send('no ifc files found for this project')
            }
    
            res.status(200).send(file)
    
        })
    
        
    })

    .catch(err =>{
        console.log(err)
        res.status(500).send(err)
    })


}
