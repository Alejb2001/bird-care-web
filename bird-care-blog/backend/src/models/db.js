// Re-export database utilities para fácil importación
const { query, getClient, pool } = require('../config/database');

module.exports = {
  query,
  getClient,
  pool
};
