const express = require('express');
const pool = require('../connection/connection');

const router = express.Router();

// Get Method
router.get('/', (req, res) => {
  pool.getConnection((err, connection) => {
    connection.query('SELECT * FROM users_patients', (error, results) => {
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
      `SELECT * FROM users_patients WHERE id=${req.params.id}`,
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
      `INSERT INTO users_patients (user_id, patient_id) VALUES (${req.body.user_id}, ${req.body.patient_id})`,
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
      `UPDATE users_patients SET user_id=${req.body.user_id}, patient_id=${req.body.patient_id} WHERE id=${req.params.id}`,
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
    connection.query(
      `DELETE FROM user_patients WHERE id=${req.params.id}`,
      (error) => {
        connection.release();
        if (error) throw error;
        res.send('Entry deleted.');
      },
    );
    if (err) console.error(`Error with connection: ${err.message}`);
  });
});

module.exports = router;
