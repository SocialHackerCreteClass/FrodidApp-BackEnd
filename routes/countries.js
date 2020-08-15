const express = require('express');
const pool = require('../connection/connection');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');

const router = express.Router();

/* PG GET method. Th "next" param is related to enabling CORS */
router.get('/', [auth, admin], (req, res) => {
  try {
    let data;
    let pageLength;
    
    if (Object.keys(req.query).length !== 2) {
      pool.query('SELECT * FROM a005_countries', (error, results) => {
        res.send(results);
      });
    } else {
        pool.query('SELECT Count(*) FROM a005_countries', (error, results) => {
          data = results.rows[0].count;
        });

      pool.query(
        `SELECT * FROM a005_countries LIMIT ${req.query.pageSize} OFFSET ${
        (req.query.pageIndex) * req.query.pageSize
        }`,
        (error, results) => {
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

/* PG Specific GET method */
router.get('/:id', [auth, admin], (req, res) => {
  try {
    pool.query(
      `SELECT * FROM a005_countries WHERE id=${req.params.id}`,
      (error, results) => {
        res.send(results);
      }
    );
  } catch (error) {
    console.error(`Error: ${error}`);
  }
});

/* PG POST method */
router.post('/', [auth, admin], (req, res) => {
  console.log(req.body.name);
  try {
      pool.query(
        `INSERT INTO a005_countries (name) VALUES ('${req.body.name}')`,
        (error, results) => {
          // pool.end();
          res.send('Posted successfully');
        }
      );
  } catch (error) {
    console.error(`Error: ${error}`);
  }
});

/* PG PUT method */
router.put('/:id', [auth, admin], (req, res) => {
  try {
    pool.query(
      `UPDATE a005_countries SET name='${req.body.name}' WHERE id=${req.params.id}`,
      () => {
        // pool.end();
        res.send('Updated successfully.');
      }
    );
  } catch (error) {
    console.error(`Error: ${error}`);
  }
});

/* PG DELETE method */
router.delete('/:id', [auth, admin], (req, res) => {
  try {
    pool.query(`DELETE FROM a005_countries WHERE id=${req.params.id}`, () => {
      // pool.end();
      res.send('Deleted successfully.');
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
//       connection.query('SELECT * FROM countries', (error, results) => {
//         connection.release();
//         res.send(results);
//       });
//     } catch (error) {
//       console.error(`Error: ${error}`);
//     }
//   });
// });

/* Specific GET method */
// router.get('/:id', (req, res) => {
//   pool.getConnection((err, connection) => {
//     try {
//       connection.query(
//         `SELECT * FROM countries WHERE id=${req.params.id}`,
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
//       connection.query(
//         `INSERT INTO countries (id, name) VALUES (${req.body.id}, "${req.body.name}")`,
//         () => {
//           connection.release();
//           res.send('Posted successfully.');
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
//         `UPDATE countries SET name="${req.body.name}" WHERE id=${req.params.id}`,
//         () => {
//           connection.release();
//           res.send('Updated successfullt.');
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
//       connection.query(
//         `DELETE FROM countries WHERE id=${req.params.id}`,
//         () => {
//           connection.release();
//           res.send('Deleted successfully.');
//         },
//       );
//     } catch (error) {
//       console.error(`Error: ${error}`);
//     }
//   });
// });
