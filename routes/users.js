const express = require('express');
const pool = require('../connection/connection');

const router = express.Router();

// Get Method
router.get('/', (req, res) => {
  pool.getConnection((err, connection) => {
    try {
      connection.query('SELECT * FROM users', (error, results) => {
        connection.release();
        res.send(results);
        res.redirect('/');
      });
    } catch (error) {
      if (error) console.error(`Error: ${error.message}`);
    }
  });
});

// Get with id Method
router.get('/:id', (req, res) => {
  pool.getConnection((err, connection) => {
    try {
      connection.query(
        `SELECT * FROM users WHERE id=${req.params.id}`,
        (error, results) => {
          connection.release();
          res.send(results);
        },
      );
    } catch (error) {
      if (error) console.error(`Error: ${error.message}`);
    }
  });
});

// Post Method
router.post('/', (req, res) => {
  pool.getConnection((err, connection) => {
    const userInfo = [
      req.body.first_name,
      req.body.last_name,
      req.body.email,
      req.body.password,
      new Date(req.body.birth_date),
      new Date(req.body.created_at),
      req.body.amka,
      req.body.afm,
      req.body.role_id,
      req.body.profession_id,
    ];

    try {
      connection.query(
        `INSERT INTO users (
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
    ) VALUES (?)`,
        [userInfo],
        (error, results) => {
          connection.release();
          res.send(results);
        },
      );
    } catch (error) {
      if (error) console.error(`Error: ${error.message}`);
    }
  });
});

/* Login method */
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    pool.getConnection((err, connection) => {
      connection.query(
        'SELECT * FROM users WHERE email = ? AND password = ?',
        [email, password],
        (error, results) => {
          connection.release();
          if (results.length > 0) {
            res.send(`Welcome, ${results[0].first_name}`);
          } else {
            res.send('Invalid email or password.');
          }
        },
      );
    });
  }
});

// Put Method
router.put('/:id', (req, res) => {
  pool.getConnection((err, connection) => {
    try {
      connection.query(
        `
    UPDATE patients SET 
    first_name="${req.body.first_name}",
    last_name="${req.body.last_name}",
    birth_date=${new Date(req.body.birth_date)},
    created_at=${new Date(req.body.created_at)},
    amka=${req.body.amka},
    afm=${req.body.afm},
    role_id=${req.body.role_id},
    profession_id=${req.body.profession_id}
    WHERE id=${req.params.id}`,
        (error, results) => {
          connection.release();
          res.send(results);
        },
      );
    } catch (error) {
      if (error) console.error(`Error: ${error.message}`);
    }
  });
});

// Delete Method
router.delete('/:id', (req, res) => {
  pool.getConnection((err, connection) => {
    try {
      connection.query(
        `DELETE FROM users WHERE id=${req.params.id}`,
        (error, results) => {
          connection.release();
          res.send(results);
        },
      );
    } catch (error) {
      if (error) console.error(`Error: ${error.message}`);
    }
  });
});

module.exports = router;
