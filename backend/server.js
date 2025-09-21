const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const clientRoutes = require("./routes/clients");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/clients", clientRoutes);

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
