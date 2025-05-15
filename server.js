
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;
const DB_FILE = 'cliques.json';

app.use(cors());
app.use(bodyParser.json());

if (!fs.existsSync(DB_FILE)) fs.writeFileSync(DB_FILE, '[]');

app.post('/registrar-clique', (req, res) => {
  const { id, timestamp } = req.body;
  const cliques = JSON.parse(fs.readFileSync(DB_FILE));
  cliques.push({ id, timestamp });
  fs.writeFileSync(DB_FILE, JSON.stringify(cliques, null, 2));
  res.sendStatus(200);
});

app.get('/obter-cliques', (req, res) => {
  const cliques = JSON.parse(fs.readFileSync(DB_FILE));
  res.json(cliques);
});

app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
