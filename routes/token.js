var express = require('express');
var tokenController = require('../controllers/token');
var mdAuthentication = require('../middlewares/authentication').ensureAuth;


var api = express.Router();

api.get('/token/verify', mdAuthentication, tokenController.checkToken);
api.get('/token', mdAuthentication, tokenController.renewToken);

module.exports = api;