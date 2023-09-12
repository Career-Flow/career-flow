import { Pool } from 'pg';

const db = new Pool({
  connectionString: process.env.PG_URI,
});

db.on('connect', () => {
  console.log('Connected to the database!');
});

db.on('error', (err) => {
  console.error('Error connecting to the database:', err);
});

module.exports = { db };
