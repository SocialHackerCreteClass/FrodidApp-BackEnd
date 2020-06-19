require('dotenv').config();
const faker = require('faker');
const moment = require('moment');
const { Seeder } = require('mysql-db-seed');
const pool = require('../../connection/connection');

const seed = new Seeder(
  10,
  process.env.DB_HOST,
  process.env.DB_USER,
  process.env.DB_PASS,
  process.env.DB_NAME,
);

// Function to determin whether a country is called
// British Indian Ocean Territory (Chagos Archipelago) or not
// becuase the name is too long to fit in varchar(45)
function isNotBIO() {
  let country = faker.address.country();
  while (country === 'British Indian Ocean Territory (Chagos Archipelago)') {
    country = faker.address.country();
  }

  return country;
}

pool.getConnection((err, connection) => {
  try {
    connection.query(
      'INSERT INTO roles (name) VALUES ("admin"), ("user");',
      () => {
        connection.release();
      },
    );
  } catch (error) {
    if (error) console.error(`Error: ${error}`);
  }
});

pool.getConnection((err, connection) => {
  try {
    connection.query(
      'INSERT INTO genders (name) VALUES ("male"), ("female"), ("other");',
      () => {
        connection.release();
      },
    );
  } catch (error) {
    if (error) console.error(`Error: ${error}`);
  }
});

(async () => {
  await seed.seed(99, 'countries', {
    name: isNotBIO,
  });

  await seed.seed(49, 'states', {
    name: faker.address.state,
  });

  await seed.seed(99, 'addresses', {
    street: faker.address.streetName,
    street_no: () => faker.random.number({ min: 1, max: 30 }),
    region: 'region',
    zipcode: faker.address.zipCode,
    country_id: () => faker.random.number({ min: 1, max: 100 }),
    state_id: () => faker.random.number({ min: 1, max: 50 }),
  });

  await seed.seed(99, 'professions', {
    name: faker.name.jobTitle,
  });

  await seed.seed(99, 'patients', {
    first_name: faker.name.firstName,
    last_name: faker.name.lastName,
    birth_date: () => moment(faker.date.past()).format('YYYY-MM-DD'),
    telephone: faker.phone.phoneNumber,
    mobile: faker.phone.phoneNumber,
    amka: () => faker.random.number({ min: 1000000000, max: 9999999999 }),
    afm: () => faker.random.number({ min: 1000000000, max: 9999999999 }),
    comments: faker.lorem.sentence,
    gender_id: () => faker.random.number({ min: 1, max: 3 }),
    address_id: () => faker.random.number({ min: 1, max: 100 }),
  });

  await seed.seed(99, 'users', {
    first_name: faker.name.firstName,
    last_name: faker.name.lastName,
    email: faker.internet.email,
    password: faker.internet.password,
    birth_date: () => moment(faker.date.past()).format('YYYY-MM-DD'),
    created_at: () => seed.nativeTimestamp(),
    amka: () => faker.random.number({ min: 1000000000, max: 9999999999 }),
    afm: () => faker.random.number({ min: 1000000000, max: 9999999999 }),
    role_id: () => faker.random.number({ min: 1, max: 2 }),
    profession_id: () => faker.random.number({ min: 1, max: 100 }),
  });

  await seed.seed(99, 'visits', {
    date: () => moment(faker.date.recent()).format('YYYY-MM-DD'),
    comment: faker.lorem.sentence,
    start_time: () => `${moment(faker.date.recent()).format('HH:MM')}:00`,
    end_time: () => `${moment(faker.date.recent()).format('HH:MM')}:00`,
    user_id: () => faker.random.number({ min: 1, max: 100 }),
  });

  await seed.seed(99, 'users_patients', {
    user_id: () => faker.random.number({ min: 1, max: 100 }),
    patient_id: () => faker.random.number({ min: 1, max: 100 }),
  });

  seed.exit();
  process.exit();
})();
