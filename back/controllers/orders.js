const pool = require('../db.js')


exports.AddNewOrder = async (req,res)=>{
    try{
        const casting_id = req.params['casting_id']
        const orderData = req.body;
      

        //verification de l'existence du casting
        const castingExists = await pool.query('SELECT * FROM castings WHERE casting_id = $1', [casting_id]);
        if (castingExists.rows.length === 0) {
          return res.status(404).json({ message: 'Le casting_id spécifié n\'existe pas.' });
        }

        //creation de la nouvelle commande
        const AddNewOrderQuery = ('INSERT INTO Orders (order_data, casting_id) VALUES ($1, $2) RETURNING *')
        const result = await pool.query(AddNewOrderQuery, [orderData, casting_id])
        res.status(201).send('Nouvelle commande créee')
    }catch (err){
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