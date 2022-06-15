import debugModule from 'debug';
const debug = debugModule('db');
const error = debugModule('error');

import postgres from 'postgres'

debug('connecting to postgres');
const sql = postgres({
  host: process.env.AWS_RDS_HOST,
  port: process.env.AWS_RDS_PORT,
  database: process.env.AWS_RDS_DATABASE,
  username: process.env.AWS_RDS_USERNAME,
  password: process.env.AWS_RDS_PASSWORD,
});

try {
  const res = await sql`SELECT version();`;
  debug('postgres version', res[0].version);
} catch (err) {
  error('could not get postgres version', err);
}

export default sql
