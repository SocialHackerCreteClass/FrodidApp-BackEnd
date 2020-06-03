const express = require('express');
const connection = require('../connection/connection');

const router = express.Router();

/* GET gender listing. */
router.get('/', (req, res) => {
  connection.connect();

  connection.query('SELECT * FROM genders;', (error, results) => {
    if (error) throw error;
    res.send(results);
  });

  connection.end();
});

/* POST gender listing. */
router.post('/', (req, res) => {
  connection.connect();

  connection.query(
    `INSERT INTO genders (id, name) VALUES (${req.body.id}, "${req.body.name}")`,
    (error) => {
      if (error) throw error;
      res.send('POST method');
    },
  );

  connection.end();
});

/* PUT gender listing. */
router.put('/', (req, res) => {
  connection.connect();

  connection.query('', (error) => {
    if (error) throw error;
    res.send('PUT method');
  });

  connection.end();
});

/* DELETE gender listing. */
router.delete('/', (req, res) => {
  connection.connect();

  connection.query('', (error) => {
    if (error) throw error;
    res.send('PUT method');
  });

  connection.end();
});

module.exports = router;
