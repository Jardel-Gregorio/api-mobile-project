const pool = require('../database');

module.exports = {
  async index(request, response) {
    try {
      const resultado = await pool.query(
        'SELECT * FROM public.unidade order by nome;',
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
        'SELECT * FROM public.unidade where id = $1;',
        [id],
      );
      return response.json(resultado.rows);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  },

  async store(request, response) {
    // eslint-disable-next-line
    const { nome, horarioAtendimento, endereco, telefone } = request.body;

    try {
      const jaExiste = await pool.query(
        `
        SELECT id FROM public.unidade
        WHERE nome = $1`,
        [nome],
      );
      if (jaExiste.rows[0]) {
        return response.status(400).json({
          error: 'Unidade já existe',
        });
      }
      const results = await pool.query(
        `INSERT INTO public.unidade 
            ( nome,  horario_atendimento, endereco, telefone )
            VALUES ($1, $2, $3, $4) RETURNING *`,
        [nome, horarioAtendimento, endereco, telefone],
      );

      return response.json(results.rows[0]);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  },

  async update(request, response) {
    const { id } = request.params;
    // eslint-disable-next-line
    const { nome, horarioAtendimento, endereco, telefone } = request.body;

    try {
      await pool.query(
        `UPDATE public.unidade
          SET nome = $2, horario_atendimento = $3, endereco = $4, telefone = $5
          WHERE id = $1;`,
        [id, nome, horarioAtendimento, endereco, telefone],
      );

      return response.json('Unidade atualizada');
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  },

  async delete(request, response) {
    const { id } = request.params;

    try {
      await pool.query('DELETE FROM public.unidade WHERE id = $1;', [id]);
      return response.json('Unidade apagada');
    } catch (error) {
      return response.status(404).json({ mensagem: error.message });
    }
  },
};
