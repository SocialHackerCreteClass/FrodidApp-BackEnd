exports.seed = function (knex) {
  knex('a001_roles').insert([
    { id: 1, name: 'admin' },
    { id: 2, name: 'user' },
  ]);
};
