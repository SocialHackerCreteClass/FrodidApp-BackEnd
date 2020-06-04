const express = require('express');
const pool = require('../connection/connection');

const router = express.Router();

/* GET patients listing. */
router.get('/', (req, res) => {
  pool.getConnection((err, connection) => {
    connection.query('SELECT * FROM patients', (error, results) => {
      connection.release();
      if (error) throw error;
      res.send(results);
    });
  });
});

/* POST patient listing. */
router.post('/', (req, res) => {
  pool.getConnection((err, connection) => {
    const patientInfo = [
      req.body.id,
      req.body.first_name,
      req.body.last_name,
      new Date(2019, 12, 12),
      req.body.telephone,
      req.body.mobile,
      req.body.amka,
      req.body.afm,
      req.body.comments,
    ];

    connection.query(
      `
    INSERT INTO patients(
      id,
      first_name,
      last_name,
      birth_date,
      telephone,
      mobile,
      amka,
      afm,
      comments
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

/* PUT patient listing. */
router.put('/:id', (req, res) => {
  pool.getConnection((err, connection) => {
    // const patientInfo = [
    //   `first_name=${req.body.first_name}`,
    //   `last_name=${req.body.last_name}`,
    //   `birth_date=${new Date(2019, 12, 12)}`,
    //   `telephone=${req.body.telephone}`,
    //   `mobile=${req.body.mobile}`,
    //   `amka=${req.body.amka}`,
    //   `afm=${req.body.afm}`,
    //   `comments=${req.body.comments}`,
    // ];

    connection.query(
      `UPDATE patients SET first_name="${req.body.first_name}"
      last_name="${req.body.last_name}"
      birth_date=${new Date(2019, 12, 12)}
      telephone=${req.body.telephone}
      mobile=${req.body.mobile}
      amka=${req.body.amka}
      afm=${req.body.afm}
      comments="${req.body.comments}" WHERE id=${req.params.id}`,
      (error) => {
        connection.release();
        if (error) throw error;
        res.send('Entry updated.');
      },
    );
  });
});

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
