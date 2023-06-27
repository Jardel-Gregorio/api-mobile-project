const pool = require('../database');

module.exports = {
  async store(request, response) {
    const { login, senha } = request.body;

    try {
      const results = await pool.query(
        `SELECT cpf, login FROM public.usuario
          WHERE login = $1 AND senha = $2`,
        [login, senha],
      );

      return response.json(results.rows[0]);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  },
};
