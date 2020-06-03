const express = require('express');
const connection = require('../connection/connection');

const router = express.Router();

/* GET patients listing. */
router.get('/', (req, res) => {
  connection.connect();

  connection.query('SELECT * FROM patients', (error, results) => {
    if (error) throw error;
    res.send(results);
  });

  connection.end();
});

/* POST patient listing. */
router.post('/', (req, res) => {
  connection.connect();

  connection.query('', (error) => {
    if (error) throw error;
    res.send('POST method');
  });

  connection.end();
});

/* PUT patient listing. */
router.put('/', (req, res) => {
  connection.connect();

  connection.query('', (error) => {
    if (error) throw error;
    res.send('PUT method');
  });

  connection.end();
});

router.delete('/', (req, res) => {
  connection.connect();

  connection.query('', (error) => {
    if (error) throw error;
    res.send('DELETE method');
  });

  connection.end();
});

module.exports = router;
