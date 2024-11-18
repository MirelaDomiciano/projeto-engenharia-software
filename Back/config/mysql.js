const mysql = require("mysql2");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.DBUSER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  waitForConnections: true,
  connectionLimit: 100,
  queueLimit: 0,
  port: process.env.PORTDB,
});

module.exports = pool.promise();
