exports.seed = async function (knex) {
  await knex('a001_roles').insert([
    { name: 'admin' },
    { name: 'user' },
  ]);
};
