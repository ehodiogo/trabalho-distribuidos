const express = require("express");
const router = express.Router();
const pool = require("../db");

router.post("/", async (req, res) => {
  const { name, email, age } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO clients (name, email, age) VALUES ($1, $2, $3) RETURNING *",
      [name, email, age]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erro ao criar cliente");
  }
});


router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM clients LIMIT 100");  // ta limitado so p poupar nois
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erro ao buscar clientes");
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM clients WHERE id = $1", [
      id,
    ]);
    if (result.rows.length === 0)
      return res.status(404).send("Cliente não encontrado");
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erro ao buscar cliente");
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, age } = req.body;
  try {
    const result = await pool.query(
      "UPDATE clients SET name=$1, email=$2, age=$3 WHERE id=$4 RETURNING *",
      [name, email, age, id]
    );
    if (result.rows.length === 0)
      return res.status(404).send("Cliente não encontrado");
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erro ao atualizar cliente");
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM clients WHERE id=$1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0)
      return res.status(404).send("Cliente não encontrado");
    res.send("Cliente deletado com sucesso");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erro ao deletar cliente");
  }
});

module.exports = router;
