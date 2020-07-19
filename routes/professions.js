const express = require('express');
const pool = require('../connection/connection');

const router = express.Router();

//  PG GET METHOD
router.get('/', (req, res) => {
  try {
    let data;
    let page_length;

    if (Object.keys(req.query).length !== 2) {
      pool.query('SELECT * FROM a002_professions', (error, results) => {
        res.send(results);
      });
    } else {
      pool.query('SELECT Count(*) FROM a002_professions', (error, results) => {
        console.log(results);
        data = results.rows[0].count;
      });

      pool.query('SELECT * FROM a002_professions LIMIT ' + req.query.items_per_page +
        ' OFFSET ' + (req.query.page_number - 1) * req.query.items_per_page, (error, results) => {
          page_length = data / req.query.items_per_page;
          res.send({
            count: data,
            items: results.rows,
            pages_length: page_length,
            items_per_page: req.query.items_per_page
          });
        });
    }
  } catch (error) {
    if (error) console.error(`Error: ${error.message}`);
  }
});

// PG GET WITH ID METHOD
router.get('/:id', (req, res) => {
  try {
    pool.query(
      `SELECT * FROM a002_professions WHERE id=${req.params.id}`,
      (err, results) => {
        res.send(results);
      }
    );
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
});

// PG POST METHOD
router.post('/', (req, res) => {
  try {
    pool.query(
      `INSERT INTO a002_professions (name) VALUES ('${req.body.name}')`,
      () => {
        res.send('Entry added.');
      }
    );
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
});

// PG PUT METHOD
router.put('/:id', (req, res) => {
  try {
    pool.query(
      `UPDATE a002_professions SET name='${req.body.name}' WHERE id=${req.params.id}`,
      () => {
        res.send('Entry updated.');
      }
    );
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
});

// PG DELETE METHOD
router.delete('/:id', (req, res) => {
  try {
    pool.query(`DELETE FROM a002_professions WHERE id=${req.params.id}`, () => {
      res.send('Entry deleted.');
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
});
module.exports = router;
// ------------------------------------
// MYQSL
// ------------------
// Get Method
// router.get('/', (req, res) => {
//   pool.getConnection((err, connection) => {
//     try {
//       connection.query('SELECT * FROM professions', (error, results) => {
//         connection.release();
//         res.send(results);
//       });
//     } catch (error) {
//       if (error) console.error(`Error: ${error.message}`);
//     }
//   });
// });

// Get with id Method
// router.get('/:id', (req, res) => {
//   pool.getConnection((err, connection) => {
//     try {
//       connection.query(
//         `SELECT * FROM professions WHERE id=${req.params.id}`,
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

// Post Method
// router.post('/', (req, res) => {
//   pool.getConnection((err, connection) => {
//     try {
//       connection.query(
//         `INSERT INTO professions (name) VALUES ("${req.body.name}")`,
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

// Put Method
// router.put('/:id', (req, res) => {
//   pool.getConnection((err, connection) => {
//     try {
//       connection.query(
//         `UPDATE professions SET name="${req.body.name}" WHERE id=${req.params.id}`,
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

// Delete Method
// router.delete('/:id', (req, res) => {
//   pool.getConnection((err, connection) => {
//     try {
//       connection.query(
//         `DELETE FROM professions WHERE id=${req.params.id}`,
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
