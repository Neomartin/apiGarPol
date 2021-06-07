var express = require('express');
var app = express();
var cors = require('cors');

//Load Routes
var garmin_routes = require('./routes/garmin');
var polar_routes = require('./routes/polar');

app.use(express.urlencoded({extended: true}));
app.use(express.json()) // To parse the incoming requests with JSON payloads

app.use(cors());


//Routes
app.use('/api', 
    garmin_routes,
    polar_routes
);


module.exports = app;