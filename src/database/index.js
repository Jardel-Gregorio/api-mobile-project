const dotenv = require('dotenv');

dotenv.config();

const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  database: 'projetosimd',
  user: 'postgres',
  password: 'dna123',
  port: 5432,
});

module.exports = pool;
