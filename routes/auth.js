const express = require('express');
const pool = require('../connection/connection');

const router = express.Router();

// PG Get with id Method
router.post('/login', (req, res) => {
  if(!req.session.test) {
    req.session.test = [];
  }

  req.session.test.push(Math.floor((Math.random() * 10) + 1));
  res.send(req.session);
});


module.exports = router;
