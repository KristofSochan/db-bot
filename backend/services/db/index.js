import debugModule from 'debug';
const debug = debugModule('db');
const error = debugModule('error');

import pg from 'pg';
const { Pool } = pg;

debug('connecting to postgres');
const pool = new Pool({
  user: process.env.AWS_RDS_USERNAME,
  host: process.env.AWS_RDS_HOST,
  database: process.env.AWS_RDS_DATABASE,
  password: process.env.AWS_RDS_PASSWORD,
  port: process.env.AWS_RDS_PORT
});

try {
  const res = await pool.query('SELECT version()');
  debug('connected to', res.rows[0].version);
} catch (err) {
  error('could not connect to postgres server', err);
}

export default pool;
