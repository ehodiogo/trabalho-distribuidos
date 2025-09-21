const { Pool } = require("pg");
const faker = require("faker");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "crud_db",
  password: "postgres",
  port: 5432,
});

async function generateData() {
  const batchSize = 1000;
  for (let i = 0; i < 50; i++) {
    const values = [];
    for (let j = 0; j < batchSize; j++) {
      values.push(
        `('${faker.name.fullName()}', '${faker.internet.email()}', ${faker.datatype.number(
          { min: 18, max: 80 }
        )})`
      );
    }
    await pool.query(
      `INSERT INTO clients (name, email, age) VALUES ${values.join(",")}`
    );
    console.log(`${(i + 1) * batchSize} registros inseridos`);
  }
  pool.end();
}

generateData();
