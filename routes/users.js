const express = require('express');
const pool = require('../connection/connection');
const auth = require('../middlewares/auth');
const permission = require('../middlewares/permission');
const id = require('../middlewares/id');

const router = express.Router();

/* GET method */
router.get('/', (req, res) => {
  try {
    let data;
    let page_length;

    if (Object.keys(req.query).length !== 2) {
      pool.query('SELECT * FROM a003_users', (error, results) => {
        res.send(results);
      });
    } else {
      pool.query('SELECT Count(*) FROM a003_users', (error, results) => {
        console.log(results);
        data = results.rows[0].count;
      });

      pool.query(
        'SELECT * FROM a003_users LIMIT ' +
          req.query.items_per_page +
          ' OFFSET ' +
          (req.query.page_number - 1) * req.query.items_per_page,
        (error, results) => {
          page_length = data / req.query.items_per_page;
          res.send({
            count: data,
            items: results.rows,
            pages_length: page_length,
            items_per_page: req.query.items_per_page,
          });
        }
      );
    }
  } catch (error) {
    if (error) console.error(`Error: ${error.message}`);
  }
});

// PG GET WITH ID METHOD
router.get('/:id', [auth, permission], (req, res) => {
  try {
    pool.query(
      `SELECT * FROM a003_users WHERE id=${req.params.id}`,
      (err, results) => {
        res.send(results.rows[0]);
      }
    );
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
});

//  PG POST METHOD
router.post('/', (req, res) => {
  console.log(req.body);
  try {
    pool.query(
      `INSERT INTO a003_users (
      first_name,
      last_name,
      email,
      password,
      birth_date,
      created_at,
      afm,
      amka,
      role_id,
      profession_id
    ) VALUES ('${req.body.first_name}',
    '${req.body.last_name}',
    '${req.body.email}',
    '${req.body.password}',
    '${req.body.birth_date}',
    '${req.body.created_at}',
    '${req.body.amka}',
    '${req.body.afm}',
    ${req.body.role_id},
    ${req.body.profession_id})`,
      (error, results) => {
        res.send(results);
      }
    );
  } catch (error) {
    if (error) console.error(`Error: ${error.message}`);
  }
});

// Put Method
router.put('/:id', [auth, permission, id], (req, res) => {
  try {
    pool.query(
      `
  UPDATE a003_users SET 
  first_name='${req.body.first_name}',
  last_name='${req.body.last_name}',
  birth_date='${req.body.birth_date}',
  created_at='${req.body.created_at}',
  email='${req.body.email}',
  password='${req.body.password}',
  amka='${req.body.amka}',
  afm='${req.body.afm}',
  role_id=${req.body.role_id},
  profession_id=${req.body.profession_id}
  WHERE id=${req.params.id}`,
      (error, results) => {
        res.send(results);
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
      `DELETE FROM a003_users WHERE id=${req.params.id}`,
      (error, results) => {
        //pool.end();
        res.send(results);
      }
    );
  } catch (error) {
    if (error) console.error(`Error: ${error.message}`);
  }
});

module.exports = router;
// ------------------
// MYSQL
// ------------------
// Get Method MYSQL
/*
router.get('/', (req, res) => {
  pool.getConnection((err, connection) => {
    try {
      connection.query('SELECT * FROM users', (error, results) => {
        connection.release();
        res.send(results);
      });
    } catch (error) {
      if (error) console.error(`Error: ${error.message}`);
    }
  });
});
*/

// Get with id Method
// router.get('/:id', (req, res) => {
//   pool.getConnection((err, connection) => {
//     try {
//       connection.query(
//         `SELECT * FROM users WHERE id=${req.params.id}`,
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
//     const userInfo = [
//       req.body.first_name,
//       req.body.last_name,
//       req.body.email,
//       req.body.password,
//       new Date(req.body.birth_date),
//       new Date(req.body.created_at),
//       req.body.amka,
//       req.body.afm,
//       req.body.role_id,
//       req.body.profession_id,
//     ];

//     try {
//       connection.query(
//         `INSERT INTO users (
//       first_name,
//       last_name,
//       email,
//       password,
//       birth_date,
//       created_at,
//       afm,
//       amka,
//       role_id,
//       profession_id
//     ) VALUES (?)`,
//         [userInfo],
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

/* Login method */
// router.post('/login', (req, res) => {
//   const { email, password } = req.body;

//   if (email && password) {
//     pool.getConnection((err, connection) => {
//       connection.query(
//         'SELECT * FROM users WHERE email = ? AND password = ?',
//         [email, password],
//         (error, results) => {
//           connection.release();
//           if (results.length > 0) {
//             res.send(`Welcome, ${results[0].first_name}`);
//           } else {
//             res.send('Invalid email or password.');
//           }
//         },
//       );
//     });
//   }
// });

// Put Method
// router.put('/:id', (req, res) => {
//   pool.getConnection((err, connection) => {
//     try {
//       connection.query(
//         `
//     UPDATE patients SET
//     first_name="${req.body.first_name}",
//     last_name="${req.body.last_name}",
//     birth_date=${new Date(req.body.birth_date)},
//     created_at=${new Date(req.body.created_at)},
//     amka=${req.body.amka},
//     afm=${req.body.afm},
//     role_id=${req.body.role_id},
//     profession_id=${req.body.profession_id}
//     WHERE id=${req.params.id}`,
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

// Delete Method
// router.delete('/:id', (req, res) => {
//   pool.getConnection((err, connection) => {
//     try {
//       connection.query(
//         `DELETE FROM users WHERE id=${req.params.id}`,
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
