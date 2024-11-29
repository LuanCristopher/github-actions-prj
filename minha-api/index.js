const express = require('express');
const app = express();

app.use(express.json());

// Lista de filmes (simulando um banco de dados)
let filmes = [
  { id: 1, titulo: 'Filme 1' },
  { id: 2, titulo: 'Filme 2' }
];

// Rota principal da API
app.get('/', (req, res) => {
  res.send('Bem-vindo à minha API!');
});

// Rota para obter todos os filmes
app.get('/filmes', (req, res) => {
  res.json(filmes);
});

// Rota para adicionar um novo filme
app.post('/filmes', (req, res) => {
  const { id, titulo } = req.body;
  if (!id || !titulo) {
    return res.status(400).json({ message: 'ID e título são obrigatórios' });
  }
  const novoFilme = { id, titulo };
  filmes.push(novoFilme);
  res.status(201).json({ message: 'Filme adicionado', filme: novoFilme });
});

// Rota para remover um filme
app.delete('/filmes/:id', (req, res) => {
  const { id } = req.params;
  const index = filmes.findIndex(f => f.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ message: 'Filme não encontrado' });
  }
  filmes.splice(index, 1); // Remove o filme
  res.status(204).send();
});

module.exports = app; // Exporta apenas o app
