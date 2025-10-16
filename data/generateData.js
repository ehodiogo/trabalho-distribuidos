// data/generateData.js
const { Pool } = require("pg");
const { faker } = require("@faker-js/faker");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "crud_db",
  password: "postgres",
  port: 5432,
});

async function generateData() {
  const batchSize = 1000; 
  const totalBatches = 50; 

  for (let i = 0; i < totalBatches; i++) {
    const clientValues = [];

    for (let j = 0; j < batchSize; j++) {
      const name = faker.person.fullName().replace(/'/g, "''"); 
      const email = faker.internet.email().replace(/'/g, "''");
      const age = faker.number.int({ min: 18, max: 80 });

      clientValues.push(`('${name}', '${email}', ${age})`);
    }

    const query = `INSERT INTO clients (name, email, age) VALUES ${clientValues.join(
      ","
    )}`;

    try {
      await pool.query(query);
      console.log(
        `Batch ${i + 1} inserido: ${(i + 1) * batchSize} registros no total`
      );
    } catch (err) {
      console.error("Erro ao inserir batch:", err);
    }
  }

  await pool.end();
  console.log("Inserção concluída!");
}

generateData();
