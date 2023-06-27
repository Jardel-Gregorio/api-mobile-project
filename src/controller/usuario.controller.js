const pool = require('../database');

module.exports = {
  async index(request, response) {
    try {
      const resultado = await pool.query(
        'SELECT * FROM public.usuario order by nome;',
      );
      return response.json(resultado.rows);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  },

  async show(request, response) {
    const { id } = request.paramns;
    try {
      const resultado = await pool.query(
        'SELECT * FROM public.usuario where id = $1;',
        [id],
      );
      return response.json(resultado.rows);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  },

  async store(request, response) {
    // eslint-disable-next-line
    const { cpf, login, senha } = request.body;

    try {
      const jaExiste = await pool.query(
        `
        SELECT id FROM public.usuario
        WHERE cpf = $1`,
        [cpf],
      );

      if (jaExiste.rows[0]) {
        return response.status(400).json({
          error: 'Usuário já existe',
        });
      }

      const jaUsado = await pool.query(
        `
        SELECT id, FROM public.usuario
          WHERE login = $1`,
        [login],
      );

      if (jaUsado.rows[0]) {
        return response.status(400).json({
          error: 'Login já utilizado',
        });
      }

      const results = await pool.query(
        `INSERT INTO public.usuario 
          ( cpf, login, senha )
            VALUES ($1, $2, $3) 
            RETURNING *`,
        [cpf, login, senha],
      );

      return response.json(results.rows[0]);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  },

  async update(request, response) {
    const { id } = request.params;
    // eslint-disable-next-line
    const { senha } = request.body;

    try {
      await pool.query(
        `UPDATE public.usuario
          SET senha = $2
          WHERE id = $1;`,
        [id, senha],
      );

      return response.json('Senha atualizada');
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  },

  async delete(request, response) {
    const { id } = request.params;

    try {
      await pool.query('DELETE FROM public.usuario WHERE id = $1;', [id]);
      return response.json('Usuario apagado');
    } catch (error) {
      return response.status(404).json({ mensagem: error.message });
    }
  },
};
