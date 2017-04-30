
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('Monster').del()
    .then(function () {
      // Inserts seed entries
      return knex('Monster').insert([
        { name: 'Snail', hp: 5, exp: 2 },
        { name: 'Rat', hp: 12, exp: 4 },
        { name: 'Mongoose', hp: 20, exp: 7 },
      ]);
    });
};
