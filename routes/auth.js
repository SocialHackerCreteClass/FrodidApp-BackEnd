const express = require('express');
const pool = require('../connection/connection');

const router = express.Router();

// PG Get with id Method
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    pool.query(
      `SELECT * FROM a003_users WHERE email = '${email}' AND password = '${password}'`,
      (error, results) => {
        if (results.rows.length) {
          req.session.user = results.rows[0];
          req.session.token = [...Array(400)].map(i=>(~~(Math.random()*36)).toString(36)).join('');
          const data = {
            user: req.session.user,
            token: req.session.token
          } 
          res.send(data);
        } else {
          res.send('Invalid email or password.');
        }
      }
    );
  }
});

router.post('/logout', (req, res) => {
  req.session = null;
  res.send("You have successfully logged out");
});

module.exports = router;
