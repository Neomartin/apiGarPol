var express = require('express');
var app = express();
var cors = require('cors');

//Load Routes
var user_routes = require('./routes/user');
var token_routes = require('./routes/token');

app.use(express.urlencoded({extended: true}));
app.use(express.json()) // To parse the incoming requests with JSON payloads

// app.use((res, req, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
// 	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
// 	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
// 	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
// 	next();
// });
app.use(cors());


//Routes
app.use('/api', 
    user_routes,
	token_routes
);


module.exports = app;