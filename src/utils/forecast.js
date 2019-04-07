const request = require('request');

const forecast = ( lat, long, callback ) => {
    const url = 'https://api.darksky.net/forecast/c6e27196f51fe067865028e77b09e650/' + encodeURIComponent(lat) + ',' + encodeURIComponent(long) + '?units=si';
  
    // ds response.body
    // object shotruhand here (url)
    request( { url, json: true }, ( error, { body } ) => {
      if ( error ) {
          callback( 'Unable to connect to weather services.', undefined ); // undefined second value implied
      } else if (  body.error ) {
          callback( 'Unable to obtain weather. Try another search.', undefined );
      } else {
        //const currently = body.currently;  
        callback( undefined,  body.daily.data[0].summary +  ' It is currently ' + body.currently.temperature + ' degrees out. There is a ' +  body.currently.precipProbability + '% change of rain.'   );
      }
    });
  
  };

  module.exports = forecast;