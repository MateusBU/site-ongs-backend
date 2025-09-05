/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('ongs', table =>{
    table.increments('id').primary();
    
    table.string('name').notNullable();
    table.string('number1'); //telefon
    table.string('number2'); //phone
    table.string('description', 1000).notNullable();
    table.string('logoOng', 1000);

    table.integer('userId').unsigned().notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE'); // if the user is deleted, the social media is also deleted
  });  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('ongs');
};
