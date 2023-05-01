const dotenv=require('dotenv');
dotenv.config();
const mysql = require("mysql");
const db = mysql.createConnection({
  host: process.env.DB_TEST_HOST ,
  user: process.env.DB_TEST_USER  ,
  port: process.env.DB_TEST_PORT,
  password: process.env.DB_TEST_PASSWORD ,
  database: process.env.DB_TEST_NAME   
});
module.exports = db