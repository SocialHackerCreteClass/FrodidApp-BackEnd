const express = require('express');
const faker = require('faker');
const moment = require('moment');
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
  res.send("Hello, guys!");
});

router.get('/whatever', (req, res) => {
  res.send('Whatever');
});

router.get('/countries', (req, res) => {
  try {
    pool.connect();
    pool.query('SELECT * FROM a005_countries', (error, results) => {
      //pool.end();
      res.send(results);
    });
  } catch (error) {
    console.error(`Error: ${error}`);
  }
});

router.delete('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

module.exports = router;
