const express = require('express');
const router = express.Router();

/* GET theater calls. */
router.get('/list/:zipcode', (req, res, next) => {
  res.send({theater: 'list'})
});

router.get('/:id', (req, res, next) => {
  res.send({theater: 'single-theater'})
});

module.exports = router;
