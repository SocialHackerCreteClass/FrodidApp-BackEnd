const express = require('express');
const pool = require('../connection/connection');
/*
const fs = require('fs');
const mysql_import = require('mysql-import');
const Importer = require('../mysql-import');
const importer = new Importer({host, user, password, database});
*/

const router = express.Router();

/*
router.get('/migration', (req, res) => {
  fs.readdir('./DB/frodid_app', (err, filenames) => {
    filenames.forEach((filename) => {
        importer.import('./DB/frodid_app/' + filename).then(()=>{
          var files_imported = importer.getImported();
          console.log('${files_imported.length} SQL file(s) imported.');
        }).catch(err=>{
          console.error(err);
        });
      });
  });
})
*/

/* GET home page. */
router.get('/', (req, res) => {
  pool.getConnection((err, connection) => {
    try {
      connection.query('SELECT * FROM users', (error, results) => {
        connection.release();
        res.send(results);
      });
    } catch (err) {
      if (err) throw err;
    }
  });
});

router.get('/whatever', (req, res) => {
  res.send('Whatever')
});

router.delete('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

module.exports = router;
