const express = require('express');
const pool = require('../connection/connection');

const router = express.Router();

/* GET method */
router.get('/', (req, res) => {
  pool.getConnection((err, connection) => {
    try {
      connection.query('SELECT * FROM patients', (error, results) => {
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
        `SELECT * FROM patients WHERE id=${req.params.id}`,
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
      const patientInfo = [
        req.body.id,
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
        () => {
          connection.release();
          res.send('Entry added.');
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
        () => {
          connection.release();
          res.send('Entry updated.');
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
      connection.query(`DELETE FROM patients WHERE id=${req.params.id}`, () => {
        connection.release();
        res.send('Entry deleted.');
      });
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  });
});

module.exports = router;
