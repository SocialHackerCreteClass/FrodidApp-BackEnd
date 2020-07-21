const express = require('express');
const pool = require('../connection/connection');

const router = express.Router();

// PG Get with id Method
router.post('/login', (req, res) => {
  req.session.test = "test";
  res.send(req.session);
});


module.exports = router;
