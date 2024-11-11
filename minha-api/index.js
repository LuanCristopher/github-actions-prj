const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Rota principal da API
app.get('/', (req, res) => {
  res.send('Bem-vindo à minha API!');
});

// Exemplo de rota para obter uma lista de itens
app.get('/items', (req, res) => {
  res.json([{ id: 1, nome: 'Item 1' }, { id: 2, nome: 'Item 2' }]);
});

// Exemplo de rota para adicionar um novo item
app.post('/items', (req, res) => {
  const newItem = req.body;
  res.status(201).json({ message: 'Item adicionado', item: newItem });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
