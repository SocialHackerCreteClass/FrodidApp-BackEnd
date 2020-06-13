const express = require('express');
const pool = require('../connection/connection');

const router = express.Router();

// Get Method
router.get('/', (req, res) => {
  pool.getConnection((err, connection) => {
    connection.query('SELECT * FROM roles', (error, results) => {
      connection.release();
      if (error) throw error;
      res.send(results);
    });
    if (err) console.error(`Error with connection: ${err.message}`);
  });
});

// Get with id Method
router.get('/:id', (req, res) => {
  pool.getConnection((err, connection) => {
    connection.query(
      `SELECT * FROM roles WHERE id=${req.params.id}`,
      (error, results) => {
        connection.release();
        if (error) throw error;
        res.send(results);
      },
    );
    if (err) console.error(`Error with connection: ${err.message}`);
  });
});

// Post Method
router.post('/', (req, res) => {
  pool.getConnection((err, connection) => {
    connection.query(
      `INSERT INTO roles (name) VALUES ("${req.body.name}")`,
      (error) => {
        connection.release();
        if (error) throw error;
        res.send('Entry added.');
      },
    );
    if (err) console.error(`Error with connection: ${err.message}`);
  });
});

// Put Method
router.put('/:id', (req, res) => {
  pool.getConnection((err, connection) => {
    connection.query(
      `UPDATE roles SET name="${req.body.name}" WHERE id=${req.params.id}`,
      (error) => {
        connection.release();
        if (error) throw error;
        res.send('Entry updated.');
      },
    );
    if (err) console.error(`Error with connection: ${err.message}`);
  });
});

// Delete Method
router.delete('/:id', (req, res) => {
  pool.getConnection((err, connection) => {
    connection.query(`DELETE FROM roles WHERE id=${req.params.id}`, (error) => {
      connection.release();
      if (error) throw error;
      res.send('Entry delteted.');
    });
    if (err) console.error(`Error with connection: ${err.message}`);
  });
});

module.exports = router;
