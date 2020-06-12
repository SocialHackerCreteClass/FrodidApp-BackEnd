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
