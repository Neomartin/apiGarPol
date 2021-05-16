// var express = require('express');
var moongose = require('mongoose');

var app = require('./app');
var port = process.env.PORT || 3800;
var password = require('./config/config').PASS;


const URL = `mongodb+srv://neotech:${password}@cluster0.yyphl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

moongose.connect(URL, { useNewUrlParser: true,  useFindAndModify: false,  useUnifiedTopology: true })
    .then(() => {
        console.log('Connection to \x1b[36mDATABASE Successful!! \x1b[37m');

        app.listen( port, () => {
            console.log('Express Server running on \x1b[33m http://localhost:' + port +' \x1b[37m');
        })
    });