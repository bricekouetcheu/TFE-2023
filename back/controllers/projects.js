const pool = require('../db.js');
const format = require('pg-format');
const fs = require('fs-extra');
const path = require('path');

exports.CreateProject  = (req, res)=>{
    const {name, address , agenda} = req.body;
    //creer un middleweares d'auth
    const user_id = req.user.user_id
    const files = req.files;
    console.log(user_id)
   

    const AddNewProjectRequest = 'INSERT INTO projects ( project_id, project_name, project_address, project_date, user_id , agenda_id) values(DEFAULT,$1, $2, DEFAULT, $3 , $4) RETURNING project_id;'
    const AddNewFileRequest = 'INSERT INTO ifc_files(file_name,project_id) VALUES %L';

    //add A new project
    pool.query(AddNewProjectRequest, [name, address ,user_id, agenda ] )
    .then((result)=>{
        const id_projet = result.rows[0].project_id;
        
        //file handling
        const fileData = files.map((file,index) =>{
            const fileName = file.filename;
            /*const unique_id = `${numero_modele}_projet${id_projet}`*/
            return [fileName, id_projet];
        })
        console.log('fileData',fileData)
        //adding a new file information into table
        pool.query(format(AddNewFileRequest,fileData ))
        .then((result)=>{

            res.status(200).send('Your files have been successfully uploaded')

        })
        .catch(err=>{
            console.log(err);
            res.status(500).send('There is something wrong');
        });

    })
    .catch (err=>{
        console.log(err);
        res.status(500).send({message:'something went wrong'});
    })

}



    exports.getAllProjects = (req, res)=>{
        const user_id = req.user.user_id
        const getAllProjectsQuery = 'select * from projects where user_id = $1'
    

    pool.query(getAllProjectsQuery,[user_id ])
    .then(result=>{
        const data = result.rows;
        res.send(data)
    }).catch(err=>{
        console.log(err)
    })

}

exports.getOneProject = async(req, res)=>{
    try{
        const project_id = req.params.project_id;
        const getOneProjectQuery = 'select *  from projects where project_id = $1'
        const result = await pool.query(getOneProjectQuery , [project_id])
        const data = result.rows;
        res.status(200).send(data)

    }catch(err){
        res.status(500).send('Erreur serveur')
        console.log(err)
    }
   
}



exports.DeleteProject = async (req, res) => {

    const projectId = req.params.project_id; // Récupérez l'ID du projet depuis les paramètres de la requête

    const client = await pool.connect();

    try {

        await client.query('BEGIN');

        // Récupérez le nom du fichier et le nom du projet associés au projet
         const query = 'SELECT project_name FROM projects WHERE project_id = $1';
         const values = [projectId];
         const result = await client.query(query, values);

         if (result.rows.length === 0) {

           throw new Error('Aucun fichier trouvé pour le projet spécifié');
         }

         
         const projectName = result.rows[0].project_name;

         // Supprimez l'enregistrement dans la table "ifc_files"
         await client.query('DELETE FROM ifc_files WHERE project_id = $1', [projectId]);

         // Supprimez l'enregistrement dans la table "projects"
         await client.query('DELETE FROM projects WHERE project_id = $1', [projectId]);

         // Supprimez le répertoire du projet du serveur
         const directoryPath = path.join(__dirname,`../IFC/${projectName}` );
         await fs.remove(directoryPath);

         await client.query('COMMIT');
         res.status(200).json({ message: 'Suppression réussie' });
  } catch (err) {

        await client.query('ROLLBACK');
        console.error('Erreur lors de la suppression :', err);
        res.status(500).json({ error: 'Une erreur s\'est produite lors de la suppression' });
  } 
  finally {
         client.release();
  }
};
