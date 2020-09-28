const express = require('express');
const pool = require('../connection/connection');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');
const admin_perm = require('../middlewares/admin_perm');

const router = express.Router();

/* GET method */
router.get('/', [auth, admin], (req, res) => {
  try {
    let data;
    let page_length;

    if (Object.keys(req.query).length !== 2) {
      pool.query(`SELECT u.id as user_id, u.first_name, u.last_name, u.email, u.password, u.mobile, u.birth_date, u.created_at,
      u.amka, u.afm, r.name role_name, p.name prof_name
      FROM a003_users u, a001_roles r, a002_professions p
      WHERE u.role_id=r.id AND u.profession_id=p.id
      `, (error, results) => {
        res.send({
          data: format_results(results.rows)
        });
      });
    } else {
      pool.query('SELECT Count(*) FROM a003_users', (error, results) => {
        data = results.rows[0].count;
      });

      pool.query(
        `SELECT u.id as user_id, u.first_name, u.last_name, u.email, u.password, u.mobile, u.birth_date, u.created_at,
        u.amka, u.afm, r.name role_name, p.name prof_name
        FROM a003_users u, a001_roles r, a002_professions p
        WHERE u.role_id=r.id AND u.profession_id=p.id
        LIMIT ${req.query.pageSize} OFFSET ${(req.query.pageIndex) * req.query.pageSize}
        `,
        (error, results) => {
          page_length = data / req.query.pageSize;
          res.send({
            total: data,
            data: format_results(results.rows),
            pages_length: page_length,
            pageSize: req.query.pageSize,
          });
        }
      );
    }
  } catch (error) {
    if (error) console.error(`Error: ${error.message}`);
  }
});

// PG GET WITH ID METHOD
router.get('/:id', [auth, admin_perm], (req, res) => {
  try {
    pool.query(
      `SELECT u.id as user_id, u.first_name, u.last_name, u.email, u.password, u.mobile, u.birth_date, u.created_at,
      u.amka, u.afm, r.name role_name, p.name prof_name
      FROM a003_users u, a001_roles r, a002_professions p
      WHERE u.id=${req.params.id} AND u.role_id=r.id AND u.profession_id=p.id
      `,
      (err, results) => {
        res.send({
          data: format_results(results.rows)
        });
      }
    );
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
});

//  PG POST METHOD
router.post('/', [auth, admin], (req, res) => {
  //console.log(req.body);
  try {
    pool.query(
      `INSERT INTO a003_users (
      first_name,
      last_name,
      email,
      password,
      mobile,
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
    '${req.body.mobile}',
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

// Put Method Only valid for users
router.put('/:id', [auth, admin_perm], (req, res) => {
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
  mobile='${req.body.mobile}',
  amka='${req.body.amka}',
  afm='${req.body.afm}',
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
router.delete('/:id', [auth, admin], (req, res) => {
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

const format_results = results => {
  const results_array = results.map(el => {
    return {
      id: el.id,
      first_name: el.first_name,
      last_name: el.last_name,
      email: el.email,
      password: el.password,
      mobile: el.mobile,
      birth_date: Math.round(el.birth_date.getTime()/1000),
      created_at: Math.round(el.created_at.getTime()/1000),
      amka: el.amka,
      afm: el.afm,
      role: el.role_name,
      profession: el.prof_name,
    }
  })
  return results_array;
}

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
