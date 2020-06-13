require('dotenv').config();       // Allows pool to recognize enviroment variables. Gotta be before pool variable definition!!!
const pool = require('../../connection/connection');
const faker = require('faker');

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
                    "${faker.internet.password({min: 8, max: 16})}",
                    "${faker.date.past()}",
                    "${faker.date.recent()}",
                    "${faker.random.number({precision: 9})}",
                    "${faker.random.number({precision: 11})}",
                    "${faker.random.number(99)}",
                    "${faker.random.number(99)}"
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
                `INSERT INTO visits (
                    date,
                    comment,
                    user_id
                ) VALUES (
                    "${faker.date.recent()}",
                    "${faker.lorem.sentences()}",
                    "${faker.random.number(99)}"
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
                `INSERT INTO visits (
                    start_time,
                    end_time
                ) VALUES (
                    "12:45",
                    "14:45"
                ), (
                    "9:50",
                    "11:30"
                ), (
                    "13:15",
                    "15:15"
                ), (
                    "17:20",
                    "19:00"
                )`,
                (error, results) => {
                    console.log(results);
                }
            )
        });
    } catch (error) {
        console.error(`Error: ${error}`);
    }
});

pool.getConnection((error, connection) => {
    try {
        [...Array(100)].forEach(() => {
            connection.query(
                `INSERT INTO roles (name) VALUES ( admin ), ( professional )`,
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
                    "${faker.random.number(99)}",
                    "${faker.random.number(99)}",
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