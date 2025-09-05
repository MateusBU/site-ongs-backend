/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('socialMedia', table =>{
    table.increments('id').primary();

    table.integer('ongId').unsigned().notNullable()
      .references('id')
      .inTable('ongs')
      .onDelete('CASCADE'); // if the ong is deleted, the social media is also deleted

    table.string('instagram');
    table.string('facebook');
    table.string('twitter');
    table.string('tiktok');
  });     
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
