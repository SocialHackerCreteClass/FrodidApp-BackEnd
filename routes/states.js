const express = require('express');
const pool = require('../connection/connection');

const router = express.Router();

/* GET method */
router.get('/', (req, res) => {
  pool.getConnection((err, connection) => {
    connection.query('SELECT * FROM states', (error, results) => {
      connection.release();
      if (error) throw error;
      res.send(results);
    });
  });
});

/* Specific GET method */
router.get('/:id', (req, res) => {
  pool.getConnection((err, connection) => {
    connection.query(
      `SELECT * FROM states WHERE id=${req.params.id}`,
      (error, results) => {
        connection.release();
        if (error) throw error;
        res.send(results);
      },
    );
  });
});

/* POST method */
router.post('/', (req, res) => {
  pool.getConnection((err, connection) => {
    connection.query(
      `INSERT INTO states (id, name) VALUES (${req.body.id}, "${req.body.name}")`,
      (error) => {
        connection.release();
        if (error) throw error;
        res.send('Posted successfully.');
      },
    );
  });
});

/* PUT method */
router.put('/:id', (req, res) => {
  pool.getConnection((err, connection) => {
    connection.query(
      `UPDATE states SET name="${req.body.name}" WHERE id=${req.params.id}`,
      (error) => {
        connection.release();
        if (error) throw error;
        res.send('Updated successfullt.');
      },
    );
  });
});

/* DELETE method */
router.delete('/:id', (req, res) => {
  pool.getConnection((err, connection) => {
    connection.query(
      `DELETE FROM states WHERE id=${req.params.id}`,
      (error) => {
        connection.release();
        if (error) throw error;
        res.send('Deleted successfully.');
      },
    );
  });
});

module.exports = router;
