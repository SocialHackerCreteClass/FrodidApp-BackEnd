const express = require('express');
const pool = require('../connection/connection');

const router = express.Router();

/* GET method */
router.get('/', (req, res) => {
  try {
    let data;
    let pageLength;

    if (Object.keys(req.query).length === 0) {
      pool.query('SELECT * FROM a006_states', (error, results) => {
        res.send(results);
      });
    } else {
      pool.query('SELECT Count(*) FROM a006_states', (error, results) => {
        data = results.rows[0].count;
      });

      pool.query(
        `SELECT * FROM a006_states LIMIT ${req.query.items_per_page} OFFSET ${
        (req.query.page_number - 1) * req.query.items_per_page
        }`,
        (error, results) => {
          pageLength = data / req.query.items_per_page;
          res.send({
            count: data,
            items: results.rows,
            pages_length: pageLength,
            items_per_page: req.query.items_per_page,
          });
        }
      );
      // pool.end();
    }
  } catch (error) {
    if (error) console.error(`Error: ${error.message}`);
  }
});

/* Specific GET method */
router.get('/:id', (req, res) => {
  try {
    pool.query(
      `SELECT * FROM a006_states WHERE id=${req.params.id}`,
      (error, results) => {
        //pool.end();
        res.send(results);
      }
    );
  } catch (error) {
    console.error(`Error: ${error}`);
  }
});

/* POST method */
router.post('/', (req, res) => {
  try {
    pool.query(
      `INSERT INTO a006_states (id, name) VALUES (${req.body.id}, "${req.body.name}")`,
      () => {
        //pool.end();
        res.send('Posted successfully.');
      }
    );
  } catch (error) {
    console.error(`Error: ${error}`);
  }
});

/* PUT method */
router.put('/:id', (req, res) => {
  try {
    pool.query(
      `UPDATE a006_states SET name="${req.body.name}" WHERE id=${req.params.id}`,
      () => {
        //pool.end();
        res.send('Updated successfullt.');
      }
    );
  } catch (error) {
    console.error(`Error: ${error}`);
  }
});

/* DELETE method */
router.delete('/:id', (req, res) => {
  try {
    pool.query(`DELETE FROM a006_states WHERE id=${req.params.id}`, () => {
      //pool.end();
      res.send('Deleted successfully.');
    });
  } catch (error) {
    console.error(`Error: ${error}`);
  }
});

module.exports = router;
// -----------------
// MYSQL
// -----------------
// /* GET method */
// router.get('/', (req, res) => {
//   pool.getConnection((err, connection) => {
//     try {
//       connection.query('SELECT * FROM states', (error, results) => {
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
//         `SELECT * FROM states WHERE id=${req.params.id}`,
//         (error, results) => {
//           connection.release();
//           res.send(results);
//         }
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
//       connection.query(
//         `INSERT INTO states (id, name) VALUES (${req.body.id}, "${req.body.name}")`,
//         () => {
//           connection.release();
//           res.send('Posted successfully.');
//         }
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
//         `UPDATE states SET name="${req.body.name}" WHERE id=${req.params.id}`,
//         () => {
//           connection.release();
//           res.send('Updated successfullt.');
//         }
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
//       connection.query(`DELETE FROM states WHERE id=${req.params.id}`, () => {
//         connection.release();
//         res.send('Deleted successfully.');
//       });
//     } catch (error) {
//       console.error(`Error: ${error}`);
//     }
//   });
// });
