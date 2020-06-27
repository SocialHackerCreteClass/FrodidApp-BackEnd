const faker = require('faker');

const createFakeUserPatient = () => ({
  user_id: faker.random.number({ min: 1, max: 100 }),
  patient_id: faker.random.number({ min: 1, max: 100 }),
});

exports.seed = async function (knex) {
  const fakeUserPatients = [];
  const desiredFakeUserPatients = 100;

  for (let i = 0; i < desiredFakeUserPatients; i += 1) {
    fakeUserPatients.push(createFakeUserPatient());
  }

  await knex('a010_users_patients').insert(fakeUserPatients);
};
