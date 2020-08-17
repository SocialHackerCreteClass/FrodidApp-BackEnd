const express = require('express');
const pool = require('../connection/connection');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');

const router = express.Router();

/* GET method */
router.get('/', [auth, admin], (req, res) => {
  try {
    let data;
    let pageLength;

    if (Object.keys(req.query).length !== 2) {
      pool.query(`SELECT p.id, p.first_name, p.last_name, p.birth_date, p.telephone, p.mobile, p.amka, p.afm, p.comments, 
      a.street, a.street_no, a.region, a.zipcode, c.name country, s.name state, g.name gender
      FROM a009_patients p, a007_addresses a, a008_genders g, a005_countries c, a006_states s
      WHERE p.address_id = a.id AND p.gender_id = g.id AND a.country_id = c.id AND a.country_id = c.id
      AND a.state_id = s.id ORDER BY p.id;
      `, (error, results) => {
        res.send(results);
      });
    } else {
      pool.query('SELECT Count(*) FROM a009_patients', (error, results) => {
        data = results.rows[0].count;
      });

      pool.query(
        `SELECT p.id, p.first_name, p.last_name, p.birth_date, p.telephone, p.mobile, p.amka, p.afm, p.comments, 
        a.street, a.street_no, a.region, a.zipcode, c.name country, s.name state, g.name gender
        FROM a009_patients p, a007_addresses a, a008_genders g, a005_countries c, a006_states s
        WHERE p.address_id = a.id AND p.gender_id = g.id AND a.country_id = c.id AND a.country_id = c.id
        AND a.state_id = s.id ORDER BY p.id 
        LIMIT ${req.query.pageSize} OFFSET ${(req.query.pageIndex) * req.query.pageSize}
        `,(error, results) => {
          pageLength = data / req.query.pageSize;
          res.send({
            total: data,
            data: results.rows,
            pages_length: pageLength,
            pageSize: req.query.pageSize,
          });
        }
      );
    }
  } catch (error) {
    if (error) console.error(`Error: ${error.message}`);
  }
});

/* Specific GET method */
router.get('/:id', [auth, admin], (req, res) => {
  try {
    pool.query(
      `SELECT p.id, p.first_name, p.last_name, p.birth_date, p.telephone, p.mobile, p.amka, p.afm, p.comments,  
      a.street, a.street_no, a.region, a.zipcode, c.name country, s.name state, g.name gender
      FROM a009_patients p, a007_addresses a, a008_genders g, a005_countries c, a006_states s
      WHERE p.id=${req.params.id} AND p.address_id = a.id AND p.gender_id = g.id AND a.country_id = c.id 
      AND a.state_id = s.id`,
      (error, results) => {
        res.send(results);
      }
    );
  } catch (error) {
    console.error(`Error: ${error}`);
  }
});

/* POST method */
router.post('/', [auth, admin], (req, res) => {
  try {
    pool.query(
      `
    INSERT INTO a009_patients(
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
    ) VALUES ('${req.body.first_name}',
    '${req.body.last_name}',
    '${req.body.birth_date}',
    '${req.body.telephone}',
    '${req.body.mobile}',
    '${req.body.amka}',
    '${req.body.afm}',
    '${req.body.comments}',
    ${req.body.gender_id},
    ${req.body.address_id})`,
      () => {
        res.send('Entry added.');
      }
    );
  } catch (error) {
    console.error(`Error: ${error}`);
  }
});

/* PUT method */
router.put('/:id', [auth, admin], (req, res) => {
  try {
    pool.query(
      `
    UPDATE a009_patients SET 
    first_name='${req.body.first_name}',
    last_name='${req.body.last_name}',
    birth_date='${req.body.birth_date}',
    telephone='${req.body.telephone}',
    mobile='${req.body.mobile}',
    amka='${req.body.amka}',
    afm='${req.body.afm}',
    comments='${req.body.comments}',
    gender_id=${req.body.gender_id},
    address_id=${req.body.address_id}
    WHERE id=${req.params.id}
    `,
      () => {
        res.send('Entry updated.');
      }
    );
  } catch (error) {
    console.error(`Error: ${error}`);
  }
});

/* DELETE method */
router.delete('/:id', [auth, admin], (req, res) => {
  try {
    pool.query(`DELETE FROM a009_patients WHERE id=${req.params.id}`, () => {
      res.send('Entry deleted.');
    });
  } catch (error) {
    console.error(`Error: ${error}`);
  }
});

module.exports = router;

// -----------------------
// MYSQL
// -----------------------
// /* GET method */
// router.get('/', (req, res) => {
//   pool.getConnection((err, connection) => {
//     try {
//       connection.query('SELECT * FROM patients', (error, results) => {
//         connection.release();
//         res.send(results);
//       });
//     } catch (error) {
//       console.error(`Error: ${error}`);
//     }
//   });
// });

// /* Specific GET method */
// router.get('/:id', (req, res) => {
//   pool.getConnection((err, connection) => {
//     try {
//       connection.query(
//         `SELECT * FROM patients WHERE id=${req.params.id}`,
//         (error, results) => {
//           connection.release();
//           res.send(results);
//         },
//       );
//     } catch (error) {
//       console.error(`Error: ${error}`);
//     }
//   });
// });

// /* POST method */
// router.post('/', (req, res) => {
//   pool.getConnection((err, connection) => {
//     try {
//       const patientInfo = [
//         req.body.id,
//         req.body.first_name,
//         req.body.last_name,
//         new Date(req.body.birth_date),
//         req.body.telephone,
//         req.body.mobile,
//         req.body.amka,
//         req.body.afm,
//         req.body.comments,
//         req.body.gender_id,
//         req.body.address_id,
//       ];

//       connection.query(
//         `
//     INSERT INTO patients(
//       first_name,
//       last_name,
//       birth_date,
//       telephone,
//       mobile,
//       amka,
//       afm,
//       comments,
//       gender_id,
//       address_id
//     ) VALUES (?)`,
//         [patientInfo],
//         () => {
//           connection.release();
//           res.send('Entry added.');
//         },
//       );
//     } catch (error) {
//       console.error(`Error: ${error}`);
//     }
//   });
// });

// /* PUT method */
// router.put('/:id', (req, res) => {
//   pool.getConnection((err, connection) => {
//     try {
//       connection.query(
//         `
//     UPDATE patients SET
//     first_name="${req.body.first_name}",
//     last_name="${req.body.last_name}",
//     birth_date=${new Date(req.body.birth_date)},
//     telephone=${req.body.telephone},
//     mobile=${req.body.mobile},
//     amka=${req.body.amka},
//     afm=${req.body.afm},
//     comments=${req.body.comments},
//     gender_id=${req.body.gender_id},
//     address_id=${req.body.address_id}
//     WHERE id=${req.params.id}
//     `,
//         () => {
//           connection.release();
//           res.send('Entry updated.');
//         },
//       );
//     } catch (error) {
//       console.error(`Error: ${error}`);
//     }
//   });
// });

// /* DELETE method */
// router.delete('/:id', (req, res) => {
//   pool.getConnection((err, connection) => {
//     try {
//       connection.query(`DELETE FROM patients WHERE id=${req.params.id}`, () => {
//         connection.release();
//         res.send('Entry deleted.');
//       });
//     } catch (error) {
//       console.error(`Error: ${error}`);
//     }
//   });
// });
