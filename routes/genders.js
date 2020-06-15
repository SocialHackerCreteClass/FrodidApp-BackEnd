const express = require('express');
const pool = require('../connection/connection');

const router = express.Router();

/* GET gender listing. */
router.get('/', (req, res) => {
  pool.getConnection((err, connection) => {
    try {
      connection.query('SELECT * FROM genders', (error, results) => {
        connection.release();
        res.send(results);
      });
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  });
});

/* POST gender listing. */
router.post('/', (req, res) => {
  pool.getConnection((err, connection) => {
    try {
      connection.query(
        `INSERT INTO genders (id, name) VALUES (${req.body.id}, "${req.body.name}")`,
        () => {
          connection.release();
          res.send('Posted successfully');
        },
      );
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  });
});

/* PUT gender listing. */
router.put('/:id', (req, res) => {
  pool.getConnection((err, connection) => {
    try {
      connection.query(
        `UPDATE genders SET name="${req.body.name}" WHERE id=${req.params.id}`,
        () => {
          connection.release();
          res.send('Updated successfully');
        },
      );
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  });
});

/* DELETE gender listing. */
router.delete('/:id', (req, res) => {
  pool.getConnection((err, connection) => {
    try {
      connection.query(`DELETE FROM genders WHERE id=${req.params.id}`, () => {
        connection.release();
        res.send('Deleted successfully');
      });
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  });
});

module.exports = router;
