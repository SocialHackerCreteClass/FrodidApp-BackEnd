const mysql = require('mysql');
const faker = require('faker');

const pool = mysql.createPool({
    host: "127.0.0.1",
    port: '3306',
    user: 'root',
    password: 'Manstein1942!!',
    database: 'frodid_app',
  });

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
        //console.log('Connection error!');
        if (err) throw err;
    }
});
