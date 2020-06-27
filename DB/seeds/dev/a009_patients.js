const faker = require('faker');
const moment = require('moment');

const createFakePatient = () => ({
  first_name: faker.name.firstName(),
  last_name: faker.name.lastName(),
  birth_date: moment(faker.date.past()).format('YYYY-MM-DD'),
  telephone: faker.phone.phoneNumber(),
  mobile: faker.phone.phoneNumber(),
  amka: faker.random.number({ min: 1000000000, max: 9999999999 }),
  afm: faker.random.number({ min: 1000000000, max: 9999999999 }),
  comments: faker.lorem.sentence(),
  gender_id: faker.random.number({ min: 1, max: 3 }),
  address_id: faker.random.number({ min: 1, max: 100 }),
});

exports.seed = async function (knex) {
  const fakePatients = [];
  const desiredFakePatients = 100;

  for (let i = 0; i < desiredFakePatients; i += 1) {
    fakePatients.push(createFakePatient());
  }

  await knex('a009_patients').insert(fakePatients);
};
