var express = require('express');
var garminController = require('../controllers/garmin');


var api = express.Router();


api.post('/garmin/request_token', garminController.reqToken);

api.post('/garmin/user_token', garminController.reqUserToken);

api.post('/garmin/dailies/:uploadStartTime/:uploadEndTime', garminController.getDailies);

api.post('/garmin/api', garminController.garminAPI);


module.exports = api;