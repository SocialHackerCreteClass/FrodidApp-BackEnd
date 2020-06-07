const express = require('express');
const pool = require('../connection/connection');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  pool.getConnection((err, connection) => {
    connection.query('SELECT * FROM users', (error, results) => {
      connection.release();
      if (err) throw err;
      res.send(results);
    });
  });
});



router.get('/whatever', (req, res) => {
  res.send('Whatever')
});

router.delete('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

module.exports = router;
