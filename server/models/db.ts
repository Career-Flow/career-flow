import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;

const db = new Pool({
  connectionString: process.env.PG_URI,
});

db.on('connect', () => {
  console.log('Connected to the database!');
});

db.on('error', (err) => {
  console.error('Error connecting to the database:', err);
});

export default db;
