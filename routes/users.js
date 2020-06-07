const express = require('express');
const pool = require('../connection/connection');

const router = express.Router();

// Get Method
router.get('/', (req, res) => {
  pool.getConnection((err, connection) => {
    connection.query('', (error, results) => {
      connection.release();
      if (error) throw error;
      res.send(results);
    });
    if (err) console.error(`Problem with connection: ${err}`);
  });
});

// Post Method 
router.post('/', (req, res) => {
  pool.getConnection((err, connection) => {
    connection.query('', (error, results) => {
      connection.release();
      if (error) throw error;
      res.send(results);
    });
    if (err) console.error(`Problem with connection: ${err}`);
  });
});

// Put Method
router.put('/', (req, res) => {
  pool.getConnection((err, connection) => {
    connection.query('', (error, results) => {
      connection.release();
      if (error) throw error;
      res.send(results);
    });
    if (err) console.error(`Problem with connection: ${err}`);
  });
});

// Delete Method
router.delete('/', (req, res) => {
  pool.getConnection((err, connection) => {
    connection.query('', (error, results) => {
      connection.release();
      if (error) throw error;
      res.send(results);
    });
    if (err) console.error(`Problem with connection: ${err}`);
  });
});

module.exports = router;
