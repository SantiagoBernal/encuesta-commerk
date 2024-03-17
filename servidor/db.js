require("dotenv").config()
const Pool = require("pg").Pool;

// const pool = new Pool({
//   user: process.env.MYSQLUSER,
//   password: process.env.MYSQLPASSWORD,
//   host: process.env.MYSQHOST,
//   port: process.env.MYSQLPORT,
//   database: process.env.MYSQLDATABASE
// });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // ssl: true
});

module.exports = pool;
