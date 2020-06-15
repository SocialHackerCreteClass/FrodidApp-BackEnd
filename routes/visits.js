const express = require('express');
const pool = require('../connection/connection');

const router = express.Router();

// Get Method
router.get('/', (req, res) => {
  pool.getConnection((err, connection) => {
    try {
      connection.query('SELECT * FROM visits', (error, results) => {
        connection.release();
        if (error) throw error;
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
        `SELECT * FROM visits WHERE id=${req.params.id}`,
        (error, results) => {
          connection.release();
          res.send(results);
        });
    } catch (error) {
      if (error) console.error(`Error: ${error.message}`);
    }
  });
});

//  Post Method
router.post('/', (req, res) => {
  pool.getConnection((err, connection) => {
    try {
      connection.query('INSERT INTO visits (date, comment, start_time, end_time, user_id) VALUES (?)',
      [visitInfo], (error, results) => {
        connection.release();
        res.send(results);
      });
    } catch (error) {
      if (error) console.error(`Error: ${error.message}`);
    }
  });
});

// Put Method
router.put('/:id', (req, res) => {
  pool.getConnection((err, connection) => {
    try {
      connection.query(`UPDATE visits SET 
      date=${new Date(req.body.date)},
      comment="${req.body.comment}",
      start_time=${new Date(req.body.start_time)},
      end_time=${req.body.end_time},
      user_id=${req.body.user_id} WHERE id=${req.params.id}`, (error, results) => {
        connection.release();
        res.send(results);
      });
    } catch (error) {
      if (error) console.error(`Error: ${error.message}`);
    }
  });
});

// Delete Method
router.delete('/:id', (req, res) => {
  pool.getConnection((err, connection) => {
    try {
      connection.query(`DELETE FROM visits WHERE id=${req.params.id}`, (error, results) => {
        connection.release();
        res.send(results);
      });
    } catch (error) {
      if (error) console.error(`Error: ${error.message}`);
    }
  });
});

module.exports = router;
