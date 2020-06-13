const express = require('express');
const pool = require('../connection/connection');

const router = express.Router();

/* GET method */
router.get('/', (req, res) => {
  pool.getConnection((err, connection) => {
    connection.query('SELECT * FROM patients', (error, results) => {
      connection.release();
      if (error) throw error;
      res.send(results);
    });
  });
});

/* Specific GET method */
router.get('/:id', (req, res) => {
  pool.getConnection((err, connection) => {
    connection.query(`SELECT * FROM patients WHERE id=${req.params.id}`,
      (error, results) => {
        connection.release();
        if (error) throw error;
        res.send(results);
      });
  });
});

/* POST method */
router.post('/', (req, res) => {
  pool.getConnection((err, connection) => {
    const patientInfo = [
      req.body.first_name,
      req.body.last_name,
      new Date(req.body.birth_date),
      req.body.telephone,
      req.body.mobile,
      req.body.amka,
      req.body.afm,
      req.body.comments,
      req.body.gender_id,
      req.body.address_id,
    ];

    connection.query(
      `
    INSERT INTO patients(
      first_name,
      last_name,
      birth_date,
      telephone,
      mobile,
      amka,
      afm,
      comments,
      gender_id,
      address_id
    ) VALUES (?)`,
      [patientInfo],
      (error) => {
        connection.release();
        if (error) throw error;
        res.send('Entry added.');
      },
    );
  });
});

/* PUT method */
router.put('/:id', (req, res) => {
  pool.getConnection((err, connection) => {
    connection.query(
      `
    UPDATE patients SET 
    first_name="${req.body.first_name}",
    last_name="${req.body.last_name}",
    birth_date=${new Date(req.body.birth_date)},
    telephone=${req.body.telephone},
    mobile=${req.body.mobile},
    amka=${req.body.amka},
    afm=${req.body.afm},
    comments=${req.body.comments},
    gender_id=${req.body.gender_id},
    address_id=${req.body.address_id}
    WHERE id=${req.params.id}
    `,
      (error) => {
        connection.release();
        if (error) throw error;
        res.send('Entry updated.');
      },
    );
  });
});

/* DELETE method */
router.delete('/:id', (req, res) => {
  pool.getConnection((err, connection) => {
    connection.query(
      `DELETE FROM patients WHERE id=${req.params.id}`,
      (error) => {
        connection.release();
        if (error) throw error;
        res.send('Entry deleted.');
      },
    );
  });
});

module.exports = router;
