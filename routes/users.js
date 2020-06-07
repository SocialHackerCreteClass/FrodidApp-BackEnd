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
    if (err) console.error(`Problem with connection: ${err.message}`);
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
    if (err) console.error(`Problem with connection: ${err.message}`);
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
    if (err) console.error(`Problem with connection: ${err.message}`);
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
    if (err) console.error(`Problem with connection: ${err.message}`);
  });
});

module.exports = router;
