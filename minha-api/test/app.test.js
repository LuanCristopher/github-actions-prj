const request = require('supertest');
const express = require('express');

const app = express();
app.get('/', (req, res) => res.send('Bem-vindo à minha API!'));

test('GET / deve retornar mensagem de boas-vindas', async () => {
  const response = await request(app).get('/');
  expect(response.statusCode).toBe(200);
  expect(response.text).toBe('Bem-vindo à minha API!');
});
