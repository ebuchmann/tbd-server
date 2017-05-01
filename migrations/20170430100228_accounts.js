
exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('Account', function (table) {
      table.uuid('id').primary();
      table.string('username');
      table.string('password');
      table.string('email');
      table.string('created_at');
      table.string('updated_at');
    })
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists('Account');
};
