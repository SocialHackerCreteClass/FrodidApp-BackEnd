const express = require('express');
const pool = require('../connection/connection');
const { RequestHeaderFieldsTooLarge } = require('http-errors');

const router = express.Router();

// PG Get with id Method
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    pool.query(
      `SELECT SELECT u.id as user_id, u.first_name, u.last_name, u.email, u.password, u.mobile, u.birth_date, u.created_at,
      u.amka, u.afm, r.name role_name, p.name prof_name 
      FROM a003_users u, a001_roles r, a002_professions p, a010_users_patients up, a011_visits v
      WHERE email = '${email}' AND password = '${password}' 
      AND u.id = up.user_id AND up.id = v.up_id`,
      (error, results) => {
        if (results.rows.length) {
          req.session.user = results.rows[0];
          req.session.token = [...Array(400)].map(i=>(~~(Math.random()*36)).toString(36)).join('');
          const data = {
            user: format_results(req.session.user),
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
