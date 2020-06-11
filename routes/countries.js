const express = require('express');
const pool = require('../connection/connection');

const router = express.Router();

/* GET method */
router.get('/', (req, res) => {
  pool.getConnection((err, connection) => {
    try {
      connection.query('SELECT * FROM countries', (error, results) => {
        connection.release();
        if (error) throw error;
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
        `SELECT * FROM countries WHERE id=${req.params.id}`,
        (error, results) => {
          connection.release();
          if (error) throw error;
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
        `INSERT INTO countries (id, name) VALUES (${req.body.id}, "${req.body.name}")`,
        (error) => {
          connection.release();
          if (error) throw error;
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
        `UPDATE countries SET name="${req.body.name}" WHERE id=${req.params.id}`,
        (error) => {
          connection.release();
          if (error) throw error;
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
      connection.query(
        `DELETE FROM countries WHERE id=${req.params.id}`,
        (error) => {
          connection.release();
          if (error) throw error;
          res.send('Deleted successfully.');
        },
      );
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  });
});

module.exports = router;
