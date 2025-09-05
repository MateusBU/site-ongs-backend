/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('address', table =>{
    table.increments('id').primary();

    table.integer('ongId').unsigned().notNullable()
      .references('id')
      .inTable('ongs')
      .onDelete('CASCADE'); // if the ong is deleted, the address is also deleted

    table.string('state').notNullable();
    table.string('city').notNullable();
    table.string('neighborhood').notNullable();
    table.string('street').notNullable();
    table.string('number').notNullable();
    table.string('additionalAddress');
    table.string('zipCode');
  });   
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
