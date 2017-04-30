
exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('Monster', function (table) {
      table.increments('id').primary();
      table.string('name');
      table.string('description');
      table.integer('hp');
      table.integer('exp');
    })
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists('Monster')
};
