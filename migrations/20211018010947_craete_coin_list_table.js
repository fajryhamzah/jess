const {Knex} = require('knex');

/**
 * 
 * @param {Knex} knex 
 */
exports.up = function(knex) {
  return knex.schema.createTable('coin_list', table => {
      table.increments();
      table.string('coin_code').notNullable();
      table.integer('threshold_type', 1).notNullable;
      table.float('price').notNullable();
      table.string('added_by').notNullable();
      table.string('updated_by');
      table.string('deleted_by');
      table.dateTime('created_at');
      table.dateTime('deleted_at');
  });
};

/**
 * 
 * @param {Knex} knex 
 * @returns 
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('coin_list');
};
