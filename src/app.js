// Core modules
const path = require('path');

// npm modules
const express = require('express');  // exposes single function
const hbs = require('hbs')
const app = express();
// add heroku support
const port = process.env.PORT || 3000;

// User defined modules
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast');

// Paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');  // server up public directory. Customize server
const viewsPath = path.join( __dirname, '../templates/views');
const partialsPath = path.join( __dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');  // include handlebars
app.set('views', viewsPath );  // set handlebars views directory
// full list on expressjs.com api page
hbs.registerPartials( partialsPath );

// Setup static directory to server. Come before app.get calls. 
// app commands are run in order they are listed. (eg public > .get > .get(*)  )
app.use( express.static( publicDirectoryPath ) );


app.get('', (req, res) => {
  // render a view up. first argi is name of object in views (hbs files),
  // second is object with data
    res.render('index', {
        title: 'Weather',
        name: 'Andrea Mead'
    });
});

// config server for specific url routes
// call get. 2 args. first is route (or sub route) to trigger. second is fn to call on action
// function has request and response, used to control input and output
app.get('', (req, res) => {
  res.send('<h1>Weather</h1>');
});

app.get('/about', (req, res) => {
  res.render('about', {
      title: 'About me',
      name: 'Andrew'
  })
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'The help page',
        name: 'Andrew'
    })
  });

app.get('/weather', (req, res) => {

  if ( !req.query.address ) {
    return res.send({
      error: 'Address must be provided'
    });
  }

  const userInput = req.query.address;
  // Need to default destructures res values if nothing comes back.
  geocode(  userInput, ( error, { latitude, longitude, location } = {} ) => {

    if ( error ) {
          return res.send({ error });
    }

    forecast( latitude, longitude, (error, forecastData) => {
        if ( error ) {
          return res.send({ error });
        }

        return res.send({
          location,
          forecast: forecastData,
          address: userInput
        });
    }); 

  });

});

app.get('/products', (req, res) => {
  //req.query contains url line key value pairs eg"/products?search=game" as a JSON object.

  if ( !req.query.search ) {
    // return simply stops function execution.
    return res.send({
      error: "You must provide a search term"
    });
  }

  console.log(req.query);
  
  res.send({
    products: []

  });
});

// Start wildcard matches (404 pages)

app.get( '/help/*', (req, res) => {
  res.render('404', {
    title: 'Error',
    message: 'Help article not found',
    name: 'Andrew'
  });

}); 

// all else,  has to come last
app.get( '*', (req, res) => {
  res.render('404', {
    title: 'Error',
    message: 'Page not found',
    name: 'Andrew'
  })
});

// start server
app.listen( port, () => {
  console.log('Server is running on port ' + port);
});