import { Pool } from 'pg';

const PG_URI = ':)'

const db = new Pool({
  connectionString: PG_URI,
});

db.on('connect', () => {
  console.log('Connected to the database!');
});

db.on('error', (err) => {
  console.error('Error connecting to the database:', err);
});

export default db;
