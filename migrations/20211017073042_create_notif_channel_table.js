const {Knex} = require('knex');

/**
 * 
 * @param {Knex} knex 
 */
exports.up = function(knex) {
  return knex.schema.createTable('notif_channel', table => {
      table.increments();

      table.text('channel_id').notNullable();
      table.string('added_by').notNullable();
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
    return knex.schema.dropTableIfExists('notif_channel');
};
