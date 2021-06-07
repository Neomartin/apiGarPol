'use strict'

var request = require('request');

// ===============================================
// GARMIN REQUEST Requests                       				   
// ===============================================
function reqToken(req, res) {
    console.log(req.body.body);
    console.log('Request called');
    request({
        url: "https://connectapi.garmin.com/oauth-service/oauth/request_token",
        method: "POST",
        json: true,   // <--Very important!!!
        // body: myJSONObject
        headers: { 'Authorization' : req.body.body }
    }, function (error, response, body){
        if(error) return  res.status(500).send(console.log(error));
        console.log(response.body);
        console.log('=====================================');
        console.log(body);
        return res.status(200).send({ body: body });
    });
}

function reqUserToken(req, res) {
    console.log(req.body.authorization);
    request({
        url: "https://connectapi.garmin.com/oauth-service/oauth/access_token",
        method: "POST",
        json: true,   // <--Very important!!!
        headers: { 'Authorization' : req.body.authorization }
    }, function (error, response, body){
        if(error) return  res.status(500).send(console.log(error));
        return res.status(200).send({ body: body });
    });
}

function garminAPI(req, res) {
    const garminPing = req.body;
    return res.send({
        garminPing
    })
}

function getDailies(req, res) {
    let headers = req.body.headers; 
    let uploadStartTime = req.params.uploadStartTime;
    let uploadEndTime = req.params.uploadEndTime;
    let url = `https://apis.garmin.com/wellness-api/rest/dailies?uploadStartTimeInSeconds=${uploadStartTime}&uploadEndTimeInSeconds=${uploadEndTime}`;
    console.log('URL: ', url);

    request({
        url: url,
        method: "GET",
        json: true,   // <--Very important!!!
        headers: { 'Authorization' : headers }
    }, function (error, response, body){
        if(error) return  res.status(500).send(console.log(error));
        return res.status(200).send({ dailies: response });
    });
}


module.exports = {
    reqToken,
    reqUserToken,
    garminAPI,
    getDailies,
}