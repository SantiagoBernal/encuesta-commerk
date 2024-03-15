require("dotenv").config()
const Pool = require("pg").Pool;

const pool = new Pool({
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  host: process.env.MYSQHOST,
  port: process.env.MYSQLPORT,
  database: process.env.MYSQLDATABASE
});

module.exports = pool;
