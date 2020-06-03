const express = require('express');

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
  res.send('visits');
});

/* UP(UT)DATE users listing. */
router.put('/', (req, res) => {
  res.send('visits');
});

/* CREATE users listing. */
router.post('/', (req, res) => {
  res.send('visits');
});

/* DELETE users listing. */
router.delete('/', (req, res) => {
  res.send('visits');
});

module.exports = router;
