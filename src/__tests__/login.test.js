// const { test, expect } = require('jest');

const pool = require('../database');
const { store } = require('../controller/login.controller');

const request = {
  body: {
    login: 'Jardel',
    senha: '123',
  },
};

const response = {
  json: jest.fn(),
  status: jest.fn().mockReturnThis(),
};

test('deve retornar um usuário válido', async () => {
  pool.query = jest.fn().mockResolvedValue({
    rows: [
      {
        cpf: '12345678900',
        login: 'Jardel',
      },
    ],
  });

  await store(request, response);

  expect(response.json).toHaveBeenCalledWith({
    cpf: '12345678900',
    login: 'Jardel',
  });

  expect(response.status).not.toHaveBeenCalled();
});

test('deve retornar um erro ao consultar o banco de dados', async () => {
  const mockError = new Error('Erro ao consultar o banco de dados');
  pool.query = jest.fn().mockRejectedValue(mockError);

  await store(request, response);

  expect(response.status).toHaveBeenCalledWith(400);

  expect(response.json).toHaveBeenCalledWith({ error: mockError.message });
});

// test('deve retornar um erro se o nome de usuário já existe', async () => {
//   pool.query = jest.fn().mockResolvedValue({
//     rows: [
//       {
//         cpf: '12345678900',
//         login: 'Jardel',
//       },
//     ],
//   });

//   await store(request, response);

//   expect(response.json).not.toHaveBeenCalled(1);

//   expect(response.status).toHaveBeenCalledWith(400);

//   expect(response.json).toHaveBeenCalledWith({
//     error: 'Nome de usuário já existe',
//   });
// });
