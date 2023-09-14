import pkg from 'pg';
const { Pool } = pkg;

const PG_URI = "postgres://kgcavihy:nthnatRfxOQ_rSSgkjadcEhgT4wFnwGW@bubble.db.elephantsql.com/kgcavihy"

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
