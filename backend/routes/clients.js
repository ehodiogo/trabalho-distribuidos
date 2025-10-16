const express = require("express");
const router = express.Router();
const pool = require("../db");

// Criar cliente
router.post("/", async (req, res) => {
  const { name, email, age } = req.body;
  console.log("[POST] /clients → Recebido:", req.body);

  try {
    const result = await pool.query(
      "INSERT INTO clients (name, email, age) VALUES ($1, $2, $3) RETURNING *",
      [name, email, age]
    );
    console.log("[POST] /clients → Criado:", result.rows[0]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error("[POST] /clients → Erro:", err.message);
    res.status(500).send("Erro ao criar cliente");
  }
});

// Listar clientes
router.get("/", async (req, res) => {
  console.log("[GET] /clients → Requisição recebida");

  try {
    const result = await pool.query("SELECT * FROM clients LIMIT 100");
    console.log("[GET] /clients → Retornando", result.rows.length, "clientes");
    res.json(result.rows);
  } catch (err) {
    console.error("[GET] /clients → Erro:", err.message);
    res.status(500).send("Erro ao buscar clientes");
  }
});

// Buscar cliente por ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  console.log(`[GET] /clients/${id} → Requisição recebida`);

  try {
    const result = await pool.query("SELECT * FROM clients WHERE id = $1", [
      id,
    ]);
    if (result.rows.length === 0) {
      console.log(`[GET] /clients/${id} → Cliente não encontrado`);
      return res.status(404).send("Cliente não encontrado");
    }
    console.log(`[GET] /clients/${id} → Retornando cliente`, result.rows[0]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error(`[GET] /clients/${id} → Erro:`, err.message);
    res.status(500).send("Erro ao buscar cliente");
  }
});

// Atualizar cliente
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, age } = req.body;
  console.log(`[PUT] /clients/${id} → Recebido:`, req.body);

  try {
    const result = await pool.query(
      "UPDATE clients SET name=$1, email=$2, age=$3 WHERE id=$4 RETURNING *",
      [name, email, age, id]
    );
    if (result.rows.length === 0) {
      console.log(`[PUT] /clients/${id} → Cliente não encontrado`);
      return res.status(404).send("Cliente não encontrado");
    }
    console.log(`[PUT] /clients/${id} → Atualizado:`, result.rows[0]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error(`[PUT] /clients/${id} → Erro:`, err.message);
    res.status(500).send("Erro ao atualizar cliente");
  }
});

// Deletar cliente
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  console.log(`[DELETE] /clients/${id} → Requisição recebida`);

  try {
    const result = await pool.query(
      "DELETE FROM clients WHERE id=$1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      console.log(`[DELETE] /clients/${id} → Cliente não encontrado`);
      return res.status(404).send("Cliente não encontrado");
    }
    console.log(`[DELETE] /clients/${id} → Deletado com sucesso`);
    res.send("Cliente deletado com sucesso");
  } catch (err) {
    console.error(`[DELETE] /clients/${id} → Erro:`, err.message);
    res.status(500).send("Erro ao deletar cliente");
  }
});

module.exports = router;
