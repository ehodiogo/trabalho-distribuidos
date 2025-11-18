const { Pool } = require("pg");

const writePool = new Pool({
  user: "admin",
  host: "pgpool", 
  database: "appdb",
  password: "admin123",
  port: 5432,
});

const readPool = new Pool({
  user: "admin",
  host: "pgpool", 
  database: "appdb",
  password: "admin123",
  port: 5432,
});

module.exports = { writePool, readPool };
