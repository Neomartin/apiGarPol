var express = require('express');
var userController = require('../controllers/user');

var mdAuthentication = require('../middlewares/authentication').ensureAuth;

var api = express.Router();

api.post('/user', userController.register);
api.post('/login', userController.login);

module.exports = api;