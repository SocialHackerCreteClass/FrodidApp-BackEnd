const express = require('express');
const pool = require('../connection/connection');

const router = express.Router();

/* GET method */
router.get('/', (req, res) => {
  pool.getConnection((err, connection) => {
    try {
      connection.query('SELECT * FROM states', (error, results) => {
        connection.release();
        res.send(results);
      });
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  });
});

/* Specific GET method */
router.get('/:id', (req, res) => {
  pool.getConnection((err, connection) => {
    try {
      connection.query(
        `SELECT * FROM states WHERE id=${req.params.id}`,
        (error, results) => {
          connection.release();
          res.send(results);
        },
      );
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  });
});

/* POST method */
router.post('/', (req, res) => {
  pool.getConnection((err, connection) => {
    try {
      connection.query(
        `INSERT INTO states (id, name) VALUES (${req.body.id}, "${req.body.name}")`,
        () => {
          connection.release();
          res.send('Posted successfully.');
        },
      );
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  });
});

/* PUT method */
router.put('/:id', (req, res) => {
  pool.getConnection((err, connection) => {
    try {
      connection.query(
        `UPDATE states SET name="${req.body.name}" WHERE id=${req.params.id}`,
        () => {
          connection.release();
          res.send('Updated successfullt.');
        },
      );
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  });
});

/* DELETE method */
router.delete('/:id', (req, res) => {
  pool.getConnection((err, connection) => {
    try {
      connection.query(`DELETE FROM states WHERE id=${req.params.id}`, () => {
        connection.release();
        res.send('Deleted successfully.');
      });
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  });
});

module.exports = router;
