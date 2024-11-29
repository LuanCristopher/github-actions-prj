const request = require('supertest');
const app = require('../index'); // Agora importa apenas o app
let server;

describe('Testando as rotas de filmes', () => {
  beforeAll(() => {
    server = app.listen(4000); // Inicializa o servidor em uma porta de teste
  });

  afterAll((done) => {
    server.close(done); // Fecha o servidor após os testes
  });

  it('Deve adicionar um novo filme', async () => {
    const response = await request(server)
      .post('/filmes')
      .send({ id: 3, titulo: 'Filme 3' });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Filme adicionado');
    expect(response.body.filme).toEqual({ id: 3, titulo: 'Filme 3' });
  });

  it('Deve retornar 404 ao tentar remover um filme inexistente', async () => {
    const response = await request(server).delete('/filmes/999');

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Filme não encontrado');
  });

  it('Deve remover um filme existente', async () => {
    // Adiciona um filme primeiro
    await request(server).post('/filmes').send({ id: 4, titulo: 'Filme 4' });

    const response = await request(server).delete('/filmes/4');
    expect(response.status).toBe(204);
  });
});
