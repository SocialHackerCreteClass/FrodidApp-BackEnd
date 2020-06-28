const faker = require('faker');

const createFakeProfessions = () => ({
  name: faker.name.jobTitle(),
});

exports.seed = async function (knex) {
  const fakeProfessions = [];
  const desiredFakeProfessions = 100;

  for (let i = 0; i < desiredFakeProfessions; i += 1) {
    fakeProfessions.push(createFakeProfessions());
  }

  await knex('a002_professions').insert(fakeProfessions);
};
