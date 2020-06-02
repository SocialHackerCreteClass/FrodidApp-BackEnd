var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Test 1' });
});

router.get('/whatever', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.delete('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
