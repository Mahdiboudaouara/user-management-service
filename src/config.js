const dotenv=require('dotenv');
dotenv.config();
const mysql = require("mysql");
const db = mysql.createConnection({
  host: process.env.DB_HOST ,
  user: process.env.DB_USER  ,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD ,
  database: process.env.DB_NAME   
});
module.exports = db