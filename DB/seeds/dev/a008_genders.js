exports.seed = function (knex) {
  return knex('a008_genders')
    .then(() => knex('a008_genders').insert([
      { name: 'male' },
      { name: 'female' },
      { name: 'other' },
    ]));
};
