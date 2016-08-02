const express = require('express');
const router = express.Router();
const Showtimes = require('showtimes');

/* GET theater calls. */
router.get('/list/:zipcode', (request, response, next) => {
  const { zipcode } = request.params;

  const api = new Showtimes(zipcode, {});

  api.getTheaters((error, theaters) => {
    if (error) throw error
    response.send(theaters);
  });
});

router.get('/:id', (request, response, next) => {
  const { id } = request.params

  const api = new Showtimes();

  api.getTheater(id, (error, theaters) => {
    if (error) throw error
    response.send(theaters);
  });
});

module.exports = router;
