const express = require('express');
const pool = require('../connection/connection');

const router = express.Router();

// Get Method
router.get('/', (req, res) => {
  pool.getConnection((err, connection) => {
    connection.query('SELECT * FROM visits', (error, results) => {
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
      `SELECT * FROM visits WHERE id=${req.params.id}`,
      (error, results) => {
        connection.release();
        if (error) throw error;
        res.send(results);
      },
    );
    if (err) console.error(`Error with connection: ${err.message}`);
  });
});

//  Post Method
router.post('/', (req, res) => {
  pool.getConnection((err, connection) => {
    const visitInfo = [
      new Date(req.body.date),
      req.body.comment,
      new Date(req.body.start_time),
      new Date(req.body.end_time),
      req.body.user_id,
    ];

    connection.query(
      'INSERT INTO visits (date, comment, start_time, end_time, user_id) VALUES (?)',
      [visitInfo],
      (error) => {
        connection.release();
        if (error) throw error;
        res.send('Entry added.');
      },
    );
    if (err) console.error(`Problem with connection: ${err.message}`);
  });
});

// Put Method
router.put('/:id', (req, res) => {
  pool.getConnection((err, connection) => {
    connection.query(
      `UPDATE visits SET 
      date=${new Date(req.body.date)},
      comment="${req.body.comment}",
      start_time=${new Date(req.body.start_time)},
      end_time=${req.body.end_time},
      user_id=${req.body.user_id} WHERE id=${req.params.id}`,
      (error) => {
        connection.release();
        if (error) throw error;
        res.send('Entry updated.');
      },
    );
    if (err) console.error(`Problem with connection: ${err.message}`);
  });
});

// Delete Method
router.delete('/:id', (req, res) => {
  pool.getConnection((err, connection) => {
    connection.query(
      `DELETE FROM visits WHERE id=${req.params.id}`,
      (error) => {
        connection.release();
        if (error) throw error;
        res.send('Entry deleted.');
      },
    );
    if (err) console.error(`Problem with connection: ${err.message}`);
  });
});

module.exports = router;
