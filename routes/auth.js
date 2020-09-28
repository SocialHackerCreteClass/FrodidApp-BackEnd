const express = require('express');
const pool = require('../connection/connection');
const { RequestHeaderFieldsTooLarge } = require('http-errors');

const router = express.Router();

// PG Get with id Method
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    pool.query(
      `SELECT u.*, v.id visit_id FROM a003_users u, a010_users_patients up, a011_visits v 
      WHERE email = '${email}' AND password = '${password}' 
      AND u.id = up.user_id AND up.id = v.up_id`,
      (error, results) => {
        if (results.rows.length) {
          req.session.user = results.rows[0];
          req.session.token = [...Array(400)].map(i=>(~~(Math.random()*36)).toString(36)).join('');
          const data = {
            user: req.session.user,
            token: req.session.token
          } 
          //data.user.visits_id = [];
          //results.rows.forEach(el => data.user.visits_id.push(el.visit_id));
          //delete data.user.visit_id;
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
