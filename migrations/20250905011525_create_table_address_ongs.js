/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('addressOng', table =>{
    table.increments('id').primary();
    
    table.string('state').notNullable();
    table.string('city').notNullable();
    table.string('neighborhood').notNullable();
    table.string('street').notNullable();
    table.string('number').notNullable();
    table.string('additionalAddress');
    table.string('zipCode');
    
    table.integer('ongId').unsigned().notNullable()
      .references('id')
      .inTable('ongs')
      .onDelete('CASCADE'); // if the ong is deleted, the address is also deleted
  });   
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('addressOng');
};
