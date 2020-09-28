const express = require('express');
const pool = require('../connection/connection');
const { RequestHeaderFieldsTooLarge } = require('http-errors');

const router = express.Router();

// PG Get with id Method
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    pool.query(
      `SELECT u.id as user_id, u.first_name, u.last_name, u.email, u.password, u.mobile, u.birth_date, u.created_at,
      u.amka, u.afm, r.name role_name, p.name prof_name 
      FROM a003_users u, a001_roles r, a002_professions p
      WHERE email = '${email}' AND password = '${password}' 
      AND u.role_id=r.id AND u.profession_id=p.id`,
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

const format_results = result => {
  const results_array = {
      id: result.id,
      first_name: result.first_name,
      last_name: result.last_name,
      email: result.email,
      password: result.password,
      mobile: result.mobile,
      birth_date: Math.round(result.birth_date.getTime()/1000),
      created_at: Math.round(result.created_at.getTime()/1000),
      amka: result.amka,
      afm: result.afm,
      role: result.role_name,
      profession: result.prof_name,
    }
  return results_array;
}

module.exports = router;
