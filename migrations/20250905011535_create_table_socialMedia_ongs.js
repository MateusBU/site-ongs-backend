/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('socialMediaOng', table =>{
    table.increments('id').primary();

    table.string('instagram');
    table.string('facebook');
    table.string('twitter');
    table.string('tiktok');
    table.string('youtube');

    table.integer('ongId').unsigned().notNullable()
      .references('id')
      .inTable('ongs')
      .onDelete('CASCADE'); // if the ong is deleted, the social media is also deleted
  });     
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('socialMediaOng');
};
