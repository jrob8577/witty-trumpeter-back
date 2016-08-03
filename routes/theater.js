const express = require('express');
const router = express.Router();
const Showtimes = require('showtimes');

const NodeGeocoder = require('node-geocoder')
const geocodeOptions = {
  provider: 'google',
  apiKey: 'AIzaSyCU2CFQ9vCDQAjWEw3a5vnxmIJt2nc653w'
}

const geocodedTheaterResponse = ( response, theaters ) => ( error, result ) => {
  const betterResults = result.map( entry => entry.value[ 0] )

  const geocodedTheaters = theaters.map( ( theater, index ) => {
    const coordinates = {
      lat: betterResults[ index ].latitude,
      lng: betterResults[ index ].longitude
    }
    
    return Object.assign( theater, { coordinates } )
  })

  response.send( geocodedTheaters )
}

/* GET theater calls. */
router.get('/list/:zipcode', (request, response, next) => {
  const { zipcode } = request.params;

  const api = new Showtimes(zipcode, {});

  api.getTheaters((error, theaters) => {
    if (error) throw error

    const addresses = theaters.map( theater => theater.address )

    NodeGeocoder( geocodeOptions ).batchGeocode(
      addresses, geocodedTheaterResponse( response, theaters )
    )
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
