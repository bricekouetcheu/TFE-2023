const {Pool} = require('pg');
require("dotenv").config();


const pool = new Pool ({
    user: 'postgres',
    host: 'localhost',
    password: process.env.DB_PASSWORD,
    database: 'TFE_2023',
    port:5432,

})

module.exports = pool;