const mysql = require("mysql");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB,
  // connectionLimit: 100,
});

pool.getConnection((err) => {
  if (err) {
    throw "Error occured: " + err;
  }
  console.log("pool created");
});

module.exports = pool;
