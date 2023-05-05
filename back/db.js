const {Pool} = require('pg');
require("dotenv").config();


const pool = new Pool ({
    user: 'postgres',
    host: 'localhost',
    password: 'TFE_2023',
    database: 'TFE_2023',
    port:5432,

})

module.exports = pool;