const express = require('express');
//const pool = require('../connection/connection');
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

router.delete('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

module.exports = router;
