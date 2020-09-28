const express = require('express');
const pool = require('../connection/connection');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');
const visit_edit_perm = require('../middlewares/visit_edit_perm');

const router = express.Router();

// PG Get with id Method
router.get('/', [auth, admin], (req, res) => {
  try {
    let data;
    let pageLength;

    if (Object.keys(req.query).length !== 2) {
      pool.query(`SELECT v.id, v.date, v.comment, v.start_time, v.end_time,
      us.first_name, us.last_name, pr.name, pa.first_name, pa.last_name, pa.comments
            FROM a011_visits v, a010_users_patients up, a003_users us, a002_professions pr, a009_patients pa
            WHERE v.up_id=up.id AND up.user_id=us.id AND us.profession_id=pr.id AND up.patient_id=pa.id
            ORDER BY v.id;
      `, (error, results) => {
        res.send({
          data: format_results(results.rows)
        });
      });
    } else {
      pool.query('SELECT Count(*) FROM a011_visits', (error, results) => {
        data = results.rows[0].count;
      });

      pool.query(
        `SELECT v.id, v.date, v.comment, v.start_time, v.end_time,
        us.first_name, us.last_name, pr.name, pa.first_name, pa.last_name, pa.comments
              FROM a011_visits v, a010_users_patients up, a003_users us, a002_professions pr, a009_patients pa
              WHERE v.up_id=up.id AND up.user_id=us.id AND us.profession_id=pr.id AND up.patient_id=pa.id
        ORDER BY v.id
        LIMIT ${req.query.pageSize} OFFSET ${(req.query.pageIndex) * req.query.pageSize}
        `,
        (error, results) => {
          pageLength = data / req.query.pageSize;
          res.send({
            total: data,
            data: format_results(results.rows),
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

// PG Get with id Method
router.get('/:id', [auth, visit_edit_perm], (req, res) => {
  try {
    pool.query(
      `SELECT v.id, v.date, v.comment, v.start_time, v.end_time,
        us.first_name, us.last_name, pr.name, pa.first_name, pa.last_name, pa.comments
          FROM a011_visits v, a010_users_patients up, a003_users us, a002_professions pr, a009_patients pa
          WHERE v.up_id=up.id AND up.user_id=us.id AND us.profession_id=pr.id 
          AND up.patient_id=pa.id AND us.id=${req.params.id}
        ORDER BY v.date DESC;;
      `,
      (error, results) => {
        res.send({
          data: format_results(results.rows),
        });
      }
    );
  } catch (error) {
    if (error) console.error(`Error: ${error.message}`);
  }
});

// PG  Post Method
router.post('/', [auth], (req, res) => {
  try {
    pool.query(
      `INSERT INTO a004_visits (date, comment, start_time, end_time, up_id) VALUES ('${req.body.date}',
      '${req.body.comment}',
      '${req.body.start_time}',
      '${req.body.end_time}',
      ${req.session.up.id})`,
      () => {
        res.send('Entry added.');
      }
    );
  } catch (error) {
    if (error) console.error(`Error: ${error.message}`);
  }
});

// PG Put Method
/*
router.put('/:id', [auth, visit_edit_perm], (req, res) => {
  try {
    pool.query(
      `UPDATE a004_visits SET 
        date='${req.body.date}',
        comment='${req.body.comment}',
        start_time='${req.body.start_time}',
        end_time='${req.body.end_time}',
        up_id=${req.session.up.id} 
      WHERE id=${req.params.id}`,
      () => {
        res.send('Entry updated.');
      }
    );
  } catch (error) {
    if (error) console.error(`Error: ${error.message}`);
  }
});
*/

// PG Delete Method
router.delete('/:id', [auth, admin], (req, res) => {
  try {
    pool.query(`DELETE FROM a004_visits WHERE id=${req.params.id}`, () => {
      res.send('Entry deleted.');
    });
  } catch (error) {
    if (error) console.error(`Error: ${error.message}`);
  }
});

const format_results = results => {
  const results_array = results.map(el => {
    return {
      id: el.id,
      date: el.date,
      comment: el.comment,
      start_time: el.start_time,
      end_time: el.end_time,
      user: {
        id: el.user_id,
        first_name: el.first_name,
        last_name: el.last_name,
        email: el.email,
        password: el.password,
        mobile: el.mobile,
        birth_date: el.birth_date,
        created_at: el.created_at,
        amka: el.amka,
        afm: el.afm,
        role: el.role_name,
        profession: el.prof_name,
      },
    }
  })
  return results_array;
}

module.exports = router;
// -----------------
// MYSQL
// -----------------
// Get Method
// router.get('/', (req, res) => {
//   pool.getConnection((err, connection) => {
//     try {
//       connection.query('SELECT * FROM visits', (error, results) => {
//         connection.release();
//         if (error) throw error;
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
//         `SELECT * FROM visits WHERE id=${req.params.id}`,
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

//  Post Method
// router.post('/', (req, res) => {
//   pool.getConnection((err, connection) => {
//     try {
//       const visitInfo = [
//         new Date(req.body.date),
//         req.body.comment,
//         new Date(req.body.start_time),
//         new Date(req.body.end_time),
//         req.body.user_id,
//       ];

//       connection.query(
//         'INSERT INTO visits (date, comment, start_time, end_time, user_id) VALUES (?)',
//         [visitInfo],
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
//         `UPDATE visits SET
//       date=${new Date(req.body.date)},
//       comment="${req.body.comment}",
//       start_time=${new Date(req.body.start_time)},
//       end_time=${req.body.end_time},
//       user_id=${req.body.user_id} WHERE id=${req.params.id}`,
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
//       connection.query(`DELETE FROM visits WHERE id=${req.params.id}`, () => {
//         connection.release();
//         res.send('Entry deleted.');
//       });
//     } catch (error) {
//       if (error) console.error(`Error: ${error.message}`);
//     }
//   });
// });
