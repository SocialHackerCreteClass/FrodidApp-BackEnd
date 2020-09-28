const faker = require('faker');
const moment = require('moment');

const createFakeVisit = () => ({
  date: moment(faker.date.recent()).format('YYYY-MM-DD'),
  comment: faker.lorem.sentence(),
  start_time: `${moment(faker.date.recent()).format('HH:MM')}:00`,
  end_time: `${moment(faker.date.recent()).format('HH:MM')}:00`,
  up_id: faker.random.number({ min: 1, max: 100 }),
});

exports.seed = async function (knex) {
  const fakeVisits = [];
  const desiredFakeVisits = 100;

  for (let i = 0; i < desiredFakeVisits; i += 1) {
    fakeVisits.push(createFakeVisit());
  }

  await knex('a004_visits').insert(fakeVisits);
};
