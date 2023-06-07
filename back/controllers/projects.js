const pool = require('../db.js');
const format = require('pg-format');


exports.CreateProject  = (req, res)=>{
    const {name, address} = req.body;
    //creer un middleweares d'auth
    const user_id = 4
    const files = req.files;
   

    const AddNewProjectRequest = 'INSERT INTO projects ( project_id, project_name, project_address, project_date, user_id) values(DEFAULT,$1, $2, DEFAULT, $3) RETURNING project_id;'
    const AddNewFileRequest = 'INSERT INTO ifc_files(file_name,project_id) VALUES %L';

    //add A new project
    pool.query(AddNewProjectRequest, [name,address ,user_id ] )
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
        const id = 4
        const getAllProjectsQuery = 'select * from projects where user_id = $1'
    

    pool.query(getAllProjectsQuery,[id])
    .then(result=>{
        const data = result.rows;
        res.send(data)
    }).catch(err=>{
        console.log(err)
    })

}