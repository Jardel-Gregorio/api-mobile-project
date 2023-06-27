const pool = require('../database');

module.exports = {
  async index(request, response) {
    try {
      const resultado = await pool.query(
        'SELECT * FROM public.exame order by nome;',
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
        'SELECT * FROM public.exame where id = $1;',
        [id],
      );
      return response.json(resultado.rows);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  },

  async store(request, response) {
    // eslint-disable-next-line
    const { nome, material, instrucoes, prazo } = request.body;

    try {
      const jaExiste = await pool.query(
        `
        SELECT id FROM public.exame
        WHERE nome = $1 AND material = $2`,
        [nome, material],
      );
      if (jaExiste.rows[0]) {
        return response.status(400).json({
          error: 'Exame já existe',
        });
      }
      const results = await pool.query(
        `INSERT INTO public.exame 
            ( nome, material, instrucoes, prazo )
            VALUES ($1, $2, $3, $4) RETURNING *`,
        [nome, material, instrucoes, prazo],
      );

      return response.json(results.rows[0]);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  },

  async update(request, response) {
    const { id } = request.params;
    // eslint-disable-next-line
    const { nome, material, instrucoes, prazo } = request.body;

    try {
      await pool.query(
        `UPDATE public.exame
          SET nome = $2, material = $3, instrucoes = $4, prazo = $5
          WHERE id = $1;`,
        [id, nome, material, instrucoes, prazo],
      );

      return response.json('Exame atualizado');
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  },

  async delete(request, response) {
    const { id } = request.params;

    try {
      await pool.query('DELETE FROM public.exame WHERE id = $1;', [id]);
      return response.json('Exame apagado');
    } catch (error) {
      return response.status(404).json({ mensagem: error.message });
    }
  },
};
