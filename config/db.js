const config = require('../knexfile.js');
const knex = require('knex')(config)

//load migrations when I start backend (it is like knex migrate:latest)
//but it is important to be careful because with many migrations, slow the process
knex.migrate.latest([config]);
module.exports = knex;