exports.seed = function (knex) {
  return knex('a008_genders')
    .then(() => knex('a008_genders').insert([
      { id: 1, name: 'male' },
      { id: 2, name: 'female' },
      { id: 3, name: 'other' },
    ]));
};
