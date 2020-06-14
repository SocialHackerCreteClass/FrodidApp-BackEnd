require('dotenv').config();       // Allows pool to recognize enviroment variables. Gotta be before pool variable definition!!!
const pool = require('../../connection/connection');
const faker = require('faker');
const formatDate = require('./formatDate');

pool.getConnection((err, connection) => {
    try {
        console.log(faker.address);
        [...Array(100)].forEach((_, i) => {
            console.log(i);
            connection.query(`INSERT INTO countries (id, name) VALUES (${i} , "${faker.address.country()}")`, (error, results) => {
                console.log(results);
                console.log(error)
            });
          });
    } catch (err) {
        if (err) throw err;
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