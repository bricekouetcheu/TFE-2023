const pool = require('../db.js') ;


exports.CreateNewCasting = async (req, res)=>{

  try{
    const {casting_description, casting_volume , template_id}= req.body;
    const project_id = req.params['project_id']

    const castingVolumeStartingDate = new Date().toISOString().split('T')[0];

    const query = 'INSERT INTO castings (casting_description, casting_volume_beton, casting_volume_starting_date, project_id, status_id , template_id) VALUES ($1, $2, $3, $4, $5 , $6) RETURNING *';
    const values = [casting_description, casting_volume, castingVolumeStartingDate, project_id , 1, template_id];

    const result = await pool.query(query, values);

    res.status(201).send('new casting created')

  }catch (err){
    console.log(err)
    res.status(500).json(err)
  }



}


exports.GetAllCastings = async(req, res)=>{
  try{
    const projet_id = req.params['project_id'];
    const getAllCastingURL = " SELECT c.casting_id,  c.casting_description, c.casting_volume_beton, c.casting_volume_starting_date, c.casting_volume_end_date, c.project_id, s.status_name FROM castings c INNER JOIN statuses s ON c.status_id = s.status_id  WHERE c.project_id = $1 ORDER BY c.casting_id ASC;"
    
    const result = await pool.query(getAllCastingURL , [projet_id])
    const data = result.rows;
  

    res.status(200).send(data)
  }catch(err){
    console.log(err)
    res.status(500).send('something went wrong')
  }
}

exports.getOneCastingById = async(req, res)=>{
  try{
    const casting_id = req.params['casting_id']

    const getOneCasting = ' SELECT c.casting_id,  c.casting_description, c.casting_volume_beton, c.casting_volume_starting_date, c.casting_volume_end_date, c.project_id, s.status_name FROM castings c INNER JOIN statuses s ON c.status_id = s.status_id  WHERE c.casting_id = $1'
    const result = await pool.query(getOneCasting, [casting_id])
    const data = result.rows;

    res.status(200).send(data)
  }catch(err){
    console.log(err)
    res.status(500).send('something went wrong')
  }
}


exports.getTemplateData = async (req , res)=>{

  try{
    const casting_id = req.params['casting_id']
    const getTemplateQuery = `SELECT template_data FROM casting_templates JOIN castings ON casting_templates.template_id = castings.template_id WHERE castings.casting_id = $1;`
    const result = await pool.query(getTemplateQuery , [casting_id])
    const data = result.rows;
  
    res.status(200).send(data)

  }catch(err){
    console.log(err)
    res.status(500).send('something went wrong')
  }

}

exports.UpdateStatus = async(req, res)=>{

  try{
    const casting_id  = req.params['casting_id']

    const UpdateStatus = 'UPDATE castings SET status_id = status_id + 1 where casting_id = $1'
    
    const result = await pool.query(UpdateStatus,[casting_id])

    res.status(200).send('Status updated successfully');

  }
  catch(err){
    console.log(err)
    res.status(500).send('server Error')
  }

 

}