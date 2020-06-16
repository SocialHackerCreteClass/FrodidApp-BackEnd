const express = require('express');
const pool = require('../connection/connection');

const router = express.Router();

// Get Method
router.get('/', (req, res) => {
  pool.getConnection((err, connection) => {
    try {
      connection.query('SELECT * FROM roles', (error, results) => {
        connection.release();
        res.send(results);
      });
    } catch (error) {
      if (error) console.error(`Error: ${error.message}`);
    }
  });
});

// Get with id Method
router.get('/:id', (req, res) => {
  pool.getConnection((err, connection) => {
    try {
      connection.query(
        `SELECT * FROM roles WHERE id=${req.params.id}`,
        (error, results) => {
          connection.release();
          res.send(results);
        },
      );
    } catch (error) {
      if (error) console.error(`Error: ${error.message}`);
    }
  });
});

// Post Method
router.post('/', (req, res) => {
  pool.getConnection((err, connection) => {
    try {
      connection.query(
        `INSERT INTO roles (name) VALUES ("${req.body.name}")`,
        () => {
          connection.release();
          res.send('Entry added.');
        },
      );
    } catch (error) {
      if (error) console.error(`Error: ${error.message}`);
    }
  });
});

// Put Method
router.put('/:id', (req, res) => {
  pool.getConnection((err, connection) => {
    try {
      connection.query(
        `UPDATE roles SET name="${req.body.name}" WHERE id=${req.params.id}`,
        () => {
          connection.release();
          res.send('Entry updated.');
        },
      );
    } catch (error) {
      if (error) console.error(`Error: ${error.message}`);
    }
  });
});

// Delete Method
router.delete('/:id', (req, res) => {
  pool.getConnection((err, connection) => {
    try {
      connection.query(`DELETE FROM roles WHERE id=${req.params.id}`, () => {
        connection.release();
        res.send('Entry deleted.');
      });
    } catch (error) {
      if (error) console.error(`Error: ${error.message}`);
    }
  });
});

module.exports = router;
