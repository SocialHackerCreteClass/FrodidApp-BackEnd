require('dotenv').config(); // Allows pool to recognize enviroment variables. Gotta be before pool variable definition!!!
const faker = require('faker');
const pool = require('../../connection/connection');

pool.getConnection((err, connection) => {
  try {
    [...Array(100)].forEach(() => {
      connection.query(
        `INSERT INTO countries (name) VALUES ("${faker.address.country()}")`,
        (error, results) => {
          console.log(results);
        },
      );
    });
  } catch (error) {
    console.error(`Error: ${error}`);
  }
});

pool.getConnection((err, connection) => {
  try {
    [...Array(50)].forEach(() => {
      connection.query(
        `INSERT INTO states (name) VALUES ("${faker.address.state()}")`,
        (error, results) => {
          console.log(results);
        },
      );
    });
  } catch (error) {
    console.error(`Error: ${error}`);
  }
});

pool.getConnection((err, connection) => {
  try {
    [...Array(100)].forEach(() => {
      connection.query(
        `INSERT INTO addresses(
            street,
            street_no,
            region,
            zipcode,
            country_id,
            state_id
            ) VALUES (
            "${faker.address.streetName()}",
            "${faker.random.number({ min: 10000, max: 99999 })}",
            "region",
            "${faker.address.zipCode()}",
            ${faker.random.number(99)},
            ${faker.random.number(49)})
            `,
        (error, results) => {
          console.log(results);
        },
      );
    });
  } catch (error) {
    console.error(`Error: ${error}`);
  }
});

pool.getConnection((err, connection) => {
  try {
    connection.query(
      'INSERT INTO genders (name) VALUES ("male"), ("female"), ("other")',
      (error, results) => {
        console.log(results);
      },
    );
  } catch (error) {
    console.error(`Error: ${error}`);
  }
});

pool.getConnection((err, connection) => {
  try {
    [...Array(100)].forEach(() => {
      connection.query(
        `
        INSERT INTO patients(
          first_name,
          last_name,
          birth_date,
          telephone,
          mobile,
          amka,
          afm,
          comments,
          gender_id,
          address_id
        ) VALUES (
          "${faker.name.firstName()}",
          "${faker.name.lastName()}",
          ${new Date(faker.date.past())},
          "${faker.phone.phoneNumber()}",
          "${faker.phone.phoneNumber()}",
          "${faker.random.number()}",
          "${faker.random.number()}",
          "${faker.lorem.sentence()}",
          ${faker.random.number({ min: 0, max: 2 })},
          ${faker.random.number(99)}
        )`,
        (error, results) => {
          console.log(results);
        },
      );
    });
  } catch (error) {
    console.error(`Error: ${error}`);
  }
});
