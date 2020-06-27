const faker = require('faker');

function isNotBIO() {
  let country = faker.address.country();

  while (country === 'British Indian Ocean Territory (Chagos Archipelago)') {
    country = faker.address.country();
  }

  return country;
}

const createFakeCountry = () => ({
  name: isNotBIO(),
});

exports.seed = async function (knex) {
  const fakeCountries = [];
  const desiredFakeCountires = 100;

  for (let i = 0; i < desiredFakeCountires; i += 1) {
    fakeCountries.push(createFakeCountry());
  }

  await knex('a005_countries').insert(fakeCountries);
};
