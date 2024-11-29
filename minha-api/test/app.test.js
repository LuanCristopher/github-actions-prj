const request = require('supertest');
const app = require('./index');  // Importa a aplicação Express

describe('Testando as rotas de filmes', () => {
  it('Deve adicionar um novo filme', async () => {
    const response = await request(app)
      .post('/filmes')
      .send({ id: 3, titulo: 'Filme 3' });
    
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Filme adicionado');
    expect(response.body.filme).toEqual({ id: 3, titulo: 'Filme 3' });
  });

  it('Deve retornar 404 ao tentar remover um filme inexistente', async () => {
    const response = await request(app).delete('/filmes/999');
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Filme não encontrado');
  });

  it('Deve remover um filme existente', async () => {
    // Adiciona um filme primeiro
    await request(app).post('/filmes').send({ id: 4, titulo: 'Filme 4' });

    const response = await request(app).delete('/filmes/4');
    expect(response.status).toBe(204);

    // Verifica se o filme foi realmente removido
    const filmesResponse = await request(app).get('/filmes');
    expect(filmesResponse.body.length).toBe(3);  // Deveriam restar 3 filmes
  });
});
