const express = require('express');
const pool = require('../connection/connection');

const router = express.Router();

/* GET gender listing. */
router.get('/', (req, res) => {
  pool.getConnection((err, connection) => {
    connection.query('SELECT * FROM genders', (error, results) => {
      connection.release();
      if (error) throw error;
      res.send(results);
    });
  });
});

/* POST gender listing. */
router.post('/', (req, res) => {
  pool.getConnection((err, connection) => {
    connection.query(
      `INSERT INTO genders (id, name) VALUES (${req.body.id}, "${req.body.name}")`,
      (error) => {
        connection.release();
        if (error) throw error;
        res.send('Posted successfully');
      },
    );
  });
});

/* PUT gender listing. */
router.put('/:id', (req, res) => {
  pool.getConnection((err, connection) => {
    connection.query(
      `UPDATE genders SET name="${req.body.name}" WHERE id=${req.params.id}`,
      (error) => {
        connection.release();
        if (error) throw error;
        res.send('Updated successfully');
      },
    );
  });
});

/* DELETE gender listing. */
router.delete('/:id', (req, res) => {
  pool.getConnection((err, connection) => {
    connection.query(
      `DELETE FROM genders WHERE id=${req.params.id}`,
      (error) => {
        connection.release();
        if (error) throw error;
        res.send('Deleted successfully');
      },
    );
  });
});

module.exports = router;
