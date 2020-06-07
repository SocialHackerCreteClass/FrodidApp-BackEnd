const express = require('express');
const pool = require('../connection/connection');

const router = express.Router();

/* GET method */
router.get('/', (req, res) => {
  pool.getConnection((err, connection) => {
    connection.query('SELECT * FROM addresses', (error, results) => {
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
      `SELECT * FROM addresses WHERE id=${req.params.id}`,
      (error, results) => {
        connection.release();
        if (error) throw error;
        res.send(results);
      }
    );
  });
});

/* POST method */
router.post('/', (req, res) => {
  pool.getConnection((err, connection) => {
    const addressInfo = [
      req.body.id,
      req.body.street,
      req.body.street_no,
      req.body.region,
      req.body.zipcode,
      req.body.country_id,
      req.body.state_id,
    ];

    connection.query(
      'INSERT INTO addresses (id, street, street_no, region, zipcode, country_id, state_id) VALUES (?)',
      [addressInfo],
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
      `
    UPDATE addresses SET
    street="${req.body.street}",
    street_no="${req.body.street_no}",
    region="${req.body.region}",
    zipcode="${req.body.zipcode}",
    country_id=${req.body.country_id},
    state_id=${req.body.state_id}
    WHERE id=${req.params.id}
    `,
      (error) => {
        if (error) throw error;
        res.send('Updated entry.');
      },
    );
  });
});

/* DELETE method */
router.delete('/:id', (req, res) => {
  pool.getConnection((err, connection) => {
    connection.query(
      `DELETE FROM addresses WHERE id=${req.params.id}`,
      (error) => {
        connection.release();
        if (error) throw error;
        res.send('Deleted entry.');
      },
    );
  });
});

module.exports = router;
