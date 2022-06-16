import debugModule from 'debug';
const debug = debugModule('db');
const error = debugModule('error');

//mport nodepostgres, { Pool, Client } from 'pg';
import * as pg from 'pg'
const { Pool} = pg

debug('connecting to postgres');

const pool = new Pool()
pool.query('SELECT NOW()', (err, res) => {
  console.log(err, res)
  pool.end()
})
// you can also use async/await
const res = await pool.query('SELECT NOW()')
await pool.end()
// clients will also use environment variables
// for connection information
const client = new Client()
await client.connect()
const res = await client.query('SELECT NOW()')
await client.end()

export default sql
