const Pool = require("pg").Pool;

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: 'sahar1404',
  port: 5432,
  database: 'nodetest'
});



module.exports = pool;
