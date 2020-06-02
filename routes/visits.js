var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('visits');
});

/* UP(UT)DATE users listing. */
router.put('/', function(req, res, next) {
    res.send('visits');
  });

  /* CREATE users listing. */
router.post('/', function(req, res, next) {
    res.send('visits');
  });

  /* DELETE users listing. */
router.delete('/', function(req, res, next) {
    res.send('visits');
  });

module.exports = router;