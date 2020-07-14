const express = require('express');
const pool = require('../connection/connection');

const router = express.Router();

//  PG GET METHOD
router.get('/', (req, res) => {
  try {
    let data;
    let page_length;

    pool.query('SELECT Count(*) FROM a010_users_patients', (error, results) => {
      console.log(results);
      data = results.rows[0].count;
    });

    pool.query('SELECT * FROM a010_users_patients LIMIT ' + req.query.items_per_page +
      ' OFFSET ' + (req.query.page_number - 1) * req.query.items_per_page, (error, results) => {
        page_length = data / req.query.items_per_page;
        res.send({
          count: data,
          items: results.rows,
          pages_length: page_length,
          items_per_page: req.query.items_per_page
        });
      });
      //pool.end();
  } catch (error) {
    if (error) console.error(`Error: ${error.message}`);
  }
});

// Get with id Method
router.get('/:id', (req, res) => {
  try {
    pool.query(
      `SELECT * FROM a010_users_patients WHERE id=${req.params.id}`,
      (error, results) => {
        //pool.end();
        res.send(results);
      }
    );
  } catch (error) {
    if (error) console.error(`Error: ${error.message}`);
  }
});

// Post Method
router.post('/', (req, res) => {
  try {
    pool.query(
      `INSERT INTO a010_users_patients (user_id, patient_id) VALUES (${req.body.user_id}, ${req.body.patient_id})`,
      () => {
        //pool.end();
        res.send('Entry added.');
      }
    );
  } catch (error) {
    if (error) console.error(`Error: ${error.message}`);
  }
});

// Put Method
router.put('/:id', (req, res) => {
  try {
    pool.query(
      `UPDATE a010_users_patients SET user_id=${req.body.user_id}, patient_id=${req.body.patient_id} WHERE id=${req.params.id}`,
      () => {
        //pool.end();
        res.send('Entry updated.');
      }
    );
  } catch (error) {
    if (error) console.error(`Error: ${error.message}`);
  }
});

// Delete Method
router.delete('/:id', (req, res) => {
  try {
    pool.query(
      `DELETE FROM a010_user_patients WHERE id=${req.params.id}`,
      () => {
        //pool.end();
        res.send('Entry deleted.');
      }
    );
  } catch (error) {
    if (error) console.error(`Error: ${error.message}`);
  }
});

module.exports = router;

// ---------------------
// MYSQL
// ---------------------
// // Get Method
// router.get('/', (req, res) => {
//   pool.getConnection((err, connection) => {
//     try {
//       connection.query('SELECT * FROM users_patients', (error, results) => {
//         connection.release();
//         res.send(results);
//       });
//     } catch (error) {
//       if (error) console.error(`Error: ${error.message}`);
//     }
//   });
// });

// // Get with id Method
// router.get('/:id', (req, res) => {
//   pool.getConnection((err, connection) => {
//     try {
//       connection.query(
//         `SELECT * FROM users_patients WHERE id=${req.params.id}`,
//         (error, results) => {
//           connection.release();
//           res.send(results);
//         },
//       );
//     } catch (error) {
//       if (error) console.error(`Error: ${error.message}`);
//     }
//   });
// });

// // Post Method
// router.post('/', (req, res) => {
//   pool.getConnection((err, connection) => {
//     try {
//       connection.query(
//         `INSERT INTO users_patients (user_id, patient_id) VALUES (${req.body.user_id}, ${req.body.patient_id})`,
//         () => {
//           connection.release();
//           res.send('Entry added.');
//         },
//       );
//     } catch (error) {
//       if (error) console.error(`Error: ${error.message}`);
//     }
//   });
// });

// // Put Method
// router.put('/:id', (req, res) => {
//   pool.getConnection((err, connection) => {
//     try {
//       connection.query(
//         `UPDATE users_patients SET user_id=${req.body.user_id}, patient_id=${req.body.patient_id} WHERE id=${req.params.id}`,
//         () => {
//           connection.release();
//           res.send('Entry updated.');
//         },
//       );
//     } catch (error) {
//       if (error) console.error(`Error: ${error.message}`);
//     }
//   });
// });

// // Delete Method
// router.delete('/:id', (req, res) => {
//   pool.getConnection((err, connection) => {
//     try {
//       connection.query(
//         `DELETE FROM user_patients WHERE id=${req.params.id}`,
//         () => {
//           connection.release();
//           res.send('Entry deleted.');
//         },
//       );
//     } catch (error) {
//       if (error) console.error(`Error: ${error.message}`);
//     }
//   });
// });

// module.exports = router;
