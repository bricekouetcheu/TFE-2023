const pool = require('pool')


exports.CreateNewCasting = async (req, res)=>{

    const {casting_name, casting_description, category, subcategory}= req.body;
    const project_id = req.params['project_id']
    

    //on recupere le template_id pour le lier au casting
    
    const templateQuery = 'SELECT template_id FROM templates WHERE template_category = $1 AND template_subcategory = $2';
    const templateResult = await pool.query(templateQuery, [category, subcategory]);

    if (templateResult.rows.length === 0) {
        return res.status(404).json({ error: 'Le template spécifié n\'existe pas.' });
      }

      const templateId = templateResult.rows[0].template_id;
      



}