const faker = require('faker');
const moment = require('moment');

const createFakeUsers = () => ({
  first_name: faker.name.firstName(),
  last_name: faker.name.lastName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  birth_date: moment(faker.date.past()).format('YYYY-MM-DD'),
  created_at: moment(faker.date.recent()).format('YYYY-MM-DD'),
  amka: faker.random.number({ min: 1000000000, max: 9999999999 }),
  afm: faker.random.number({ min: 1000000000, max: 9999999999 }),
  role_id: faker.random.number({ min: 1, max: 2 }),
  profession_id: faker.random.number({ min: 1, max: 100 }),
});

exports.seed = async function (knex) {
  const fakeUsers = [];
  const desiredFakeUsers = 100;

  for (let i = 0; i < desiredFakeUsers; i += 1) {
    fakeUsers.push(createFakeUsers());
  }

  // Creates a default admin
  fakeUsers[0].email="admin";
  fakeUsers[0].password="admin";
  fakeUsers[0].role_id=1;

  await knex('a003_users').insert(fakeUsers);
};
