var express = require('express');
var polarController = require('../controllers/polar');



var api = express.Router();

api.post('/polar', polarController.polarToken);
api.post('/polar/user', polarController.polarUserReg);
api.get('/polar/user/:id', polarController.polarUserInfo);
api.get('/polar/transaction/:id', polarController.createTransaction);
api.get('/polar/activity-log/:id/:tid', polarController.activityLog);
api.post('/polar/activity', polarController.activitySummary);
api.put('/polar/transaction/:id/:tid', polarController.commitTransaction);

module.exports = api;