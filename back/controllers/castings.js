const pool = require('../db.js') ;


exports.CreateNewCasting = async (req, res)=>{

  try{
    const {casting_description, casting_volume}= req.body;
    const project_id = req.params['project_id']

    const castingVolumeStartingDate = new Date().toISOString().split('T')[0];

    const query = 'INSERT INTO castings (casting_description, casting_volume_beton, casting_volume_starting_date, project_id, status_id) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const values = [casting_description, casting_volume, castingVolumeStartingDate, project_id , 1];

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
    console.log(projet_id)
    const getAllCastingURL = 'SELECT * FROM castings where project_id = $1';
    
    const result = await pool.query(getAllCastingURL , [projet_id])
    const data = result.rows;
  

    res.status(200).send(data)
  }catch(err){
    console.log(err)
    res.status(500).send('something went wrong')
  }
}

