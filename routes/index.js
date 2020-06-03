const express = require('express');
const pool = require('../connection/connection');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  pool.getConnection((err, connection) => {
    connection.query('SELECT * FROM employee', (error, results) => {
      connection.release();
      if (error) throw error;
      res.send(results);
    });
  });
});

router.get('/whatever', (req, res) => {
  res.render('index', { title: 'Express' });
});

router.delete('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

module.exports = router;
