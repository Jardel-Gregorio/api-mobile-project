const pool = require('../database');
const { store, update } = require('../controller/usuario.controller');

const request = {
  body: {},
  params: {},
};

const response = {
  json: jest.fn(),
  status: jest.fn().mockReturnThis(),
};

pool.query = jest.fn();

test('deve retornar um erro se o usuário já existe', async () => {
  pool.query.mockResolvedValueOnce({
    rows: [{}],
  });

  await store(request, response);

  expect(response.status).toHaveBeenCalledWith(400);
  expect(response.json).toHaveBeenCalledWith({
    error: 'Usuário já existe',
  });
});

test('deve retornar um erro se o login já foi utilizado', async () => {
  // Simula que o login já foi utilizado no banco de dados
  pool.query
    .mockResolvedValueOnce({
      rows: [],
    })
    .mockResolvedValueOnce({
      rows: [{}],
    });

  await store(request, response);

  expect(response.status).toHaveBeenCalledWith(400);
  expect(response.json).toHaveBeenCalledWith({
    error: 'Login já utilizado',
  });
});

test('deve cadastrar um novo usuário', async () => {
  pool.query.mockResolvedValueOnce({
    rows: [
      {
        cpf: '123456',
        login: 'maria',
        senha: '123',
      },
    ],
  });

  await store(request, response);

  expect(response.json).toHaveBeenCalledWith({
    cpf: '123456',
    login: 'maria',
    senha: '123',
  });
});

test('deve atualizar a senha do usuário', async () => {
  pool.query.mockResolvedValueOnce();

  request.params.id = '1';
  request.body.senha = '0123';

  await update(request, response);

  expect(response.json).toHaveBeenCalledWith('Senha atualizada');
});
