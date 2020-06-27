const faker = require('faker');

const createFakeState = () => ({
  name: faker.address.state(),
});

exports.seed = async function (knex) {
  const fakeStates = [];
  const desiredFakeStates = 50;

  for (let i = 0; i < desiredFakeStates; i += 1) {
    fakeStates.push(createFakeState());
  }

  await knex('a006_states').insert(fakeStates);
};
