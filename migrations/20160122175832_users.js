
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', function(table) {
      table.increments();
      table.string('username');
      table.string('email');
      table.timestamps();
    }),
    knex.schema.createTable('posts', function(table) {
      table.increments();
      table.string('title');
      table.text('body');
      table.timestamps();
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users'),
    knex.schema.dropTable('posts')
  ])
};
