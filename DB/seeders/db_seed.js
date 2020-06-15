require('dotenv').config(); // Allows pool to recognize enviroment variables. Gotta be before pool variable definition!!!
const faker = require('faker');
const formatDate = require('./formatDate');
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

pool.getConnection((err, connection) => {
  try {
    [...Array(100)].forEach(() => {
      connection.query(
        `INSERT INTO professions (name) VALUES ("${faker.name.jobTitle()}")`,
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
        `
        INSERT INTO users(
          first_name,
          last_name,
          email,
          password,
          birth_date,
          created_at,
          amka,
          afm,
          role_id,
          profession_id
        ) VALUES (
          "${faker.name.firstName()}",
          "${faker.name.lastName()}",
          "${faker.internet.email()}",
          "${faker.internet.password()}",
          ${new Date(faker.date.past())},
          ${new Date(faker.date.past())},
          "${faker.random.number()}",
          "${faker.random.number()}",
          ${faker.random.number({ min: 0, max: 1 })},
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

pool.getConnection((err, connection) => {
  try {
    [...Array(100)].forEach(() => {
      connection.query(
        `
        INSERT INTO visits(
          date,
          comment,
          start_time,
          end_time,
          user_id
        ) VALUES (
          ${new Date(faker.date.recent())},
          "${faker.lorem.sentence()}"
          ${new Date(faker.date.past())},
          ${new Date(faker.date.recent())},
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

pool.getConnection((err, connection) => {
    try {
        [...Array(100)].forEach(() => {
            connection.query(
                `INSERT INTO users(
                    first_name,
                    last_name,
                    email,
                    password,
                    birth_date,
                    created_at,
                    afm,
                    amka,
                    role_id,
                    profession_id
                ) VALUES (
                    "${faker.name.firstName()}",
                    "${faker.name.lastName()}",
                    "${faker.internet.email()}",
                    "${faker.internet.password()}",
                    "${formatDate(faker.date.past())}",
                    "${formatDate(faker.date.past())}",
                    "${faker.random.number({precision: 9})}",
                    "${faker.random.number({precision: 11})}",
                    "${faker.random.number({min:1, max:100})}",
                    "${faker.random.number({min:1, max:100})}"
                )`,
                (error, results) => {
                    console.log(results);
                }
            );
        });
    } catch (error) {
        console.error(`Error: ${error}`);
    }
});

pool.getConnection((error, connection) => {
    try {
        [...Array(100)].forEach(() => {
            connection.query(
                `INSERT INTO professions (name) VALUES ("${faker.name.jobTitle()}")`,
                (error, results) => {
                    console.log(results);
                }
            );
        });
    } catch (error) {
        console.error(`Error: ${error}`);
    }
});

pool.getConnection((error, connection) => {
    try {
        [...Array(100)].forEach(() => {
            connection.query(
                `INSERT INTO visits(
                    date,
                    comment,
                    start_time,
                    end_time,
                    user_id
                ) VALUES(
                    "${formatDate(faker.date.past())}",
                    "${faker.lorem.sentence()}",
                    "12:45:00",
                    "14:45:00",
                    "${faker.random.number({min:1, max:100})}"
                )`, 
                (error, results) => {
                    console.log(results);
                }
            );
        });
    } catch (error) {
        console.error(`Error: ${error}`);
    }
});

pool.getConnection((error, connection) => {
    try {
        [...Array(100)].forEach(() => {
            connection.query(
                `INSERT INTO roles (name) VALUES ("admin"), ("professional")`,
                (error, results) => {
                    console.log(results);
                }
            );   
        });
    } catch (error) {
        console.error(`Error: ${error}`);
    }
});

pool.getConnection((error, connection) => {
    try {
        [...Array(100)].forEach(() => {
            connection.query(
                `INSERT INTO users_patients (
                    user_id, 
                    patient_id
                ) VALUES (
                    "${faker.random.number({min:1, max:100})}", 
                    "${faker.random.number({min:1, max:100})}"
                )`,
                (error, results) => {
                    console.log(results);
                }
            );
        });  
    } catch (error) {
        console.error(`Error: ${error}`);
    }
});