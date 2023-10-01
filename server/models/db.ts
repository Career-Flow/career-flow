import pkg from "pg";
const { Pool } = pkg;

const PG_URI =
  "postgres://zasayxvv:jRSDOz6yyfv51BZ7bwGcPk1_sIL7ZfRm@bubble.db.elephantsql.com/zasayxvv";

const db = new Pool({
  connectionString: PG_URI,
});

db.on("connect", () => {
  console.log("Connected to the database!");
});

db.on("error", (err) => {
  console.error("Error connecting to the database:", err);
});

export default db;
