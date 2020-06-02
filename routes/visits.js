var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/visits', function(req, res, next) {
  res.send('visits');
});

module.exports = router;