const express = require('express');
const connection = require('../connection/connection');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  connection.connect();

  connection.query('SELECT * FROM employee', (error, results) => {
    if (error) throw error;
    res.send(results);
  });

  connection.end();
});

router.get('/whatever', (req, res) => {
  res.render('index', { title: 'Express' });
});

router.delete('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

module.exports = router;
