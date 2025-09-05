/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('imageOngs', table => {
    table.increments('id').primary();
    
    table.string('image_url').notNullable();
    table.string('caption');
    
        table.integer('ongId').unsigned().notNullable()
          .references('id')
          .inTable('ongs')
          .onDelete('CASCADE');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('imageOngs');
};
