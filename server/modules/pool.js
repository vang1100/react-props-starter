const pg = require('pg');

const pool = new pg.Pool({
  host: 'localhost',
  port: 5432,
  database: 'react-props-starter-db',
});

module.exports = pool;
