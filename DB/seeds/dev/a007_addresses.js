const faker = require('faker');

const createFakeAddress = () => ({
  street: faker.address.streetName(),
  street_no: faker.random.number({ min: 1, max: 30 }),
  region: 'region',
  zipcode: faker.address.zipCode(),
  country_id: faker.random.number({ min: 1, max: 100 }),
  state_id: faker.random.number({ min: 1, max: 50 }),
});

exports.seed = async function (knex) {
  const fakeAddresses = [];
  const desiredFakeAddresses = 100;

  for (let i = 0; i < desiredFakeAddresses; i += 1) {
    fakeAddresses.push(createFakeAddress());
  }

  await knex('a007_addresses').insert(fakeAddresses);
};
