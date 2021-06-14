'use strict'
var request = require('request');
var responseExample = require('../zone-samples.json');

function polarToken(req, res) {
    let authorization = req.headers.authorization;
    let data = `grant_type=authorization_code&code=${req.body.code}`;
    console.log('Hola', req);
    request({
        url: "https://polarremote.com/v2/oauth2/token",
        method: "POST",
        // json: true,
        body: data,
        headers: { 'Authorization' : authorization, 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json;charset=UTF-8' }
    }, function (error, response, body){
        if(error) return  res.status(500).send(console.log(error));
        console.log(body)
        return res.status(200).send(response);
    });
}

function polarUserReg(req, res) {
    console.log(req.headers.authorization);
    console.log(req.body.userID);
    let authorization = req.headers.authorization;
    const inputBody = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><register><member-id>${req.body.userID}</member-id></register>`;
    request({
        url: "https://www.polaraccesslink.com/v3/users",
        method: "POST",
        // json: true,
        body: inputBody,
        headers: { 'Authorization' : authorization, 'Content-Type': 'application/xml'}
    }, function (error, response, body){
        if(error) return  res.status(500).send(console.log(error));
        return res.status(200).send(response);
    });
}

function polarUserInfo(req, res) {
    let id = req.params.id;
    let authorization = req.headers.authorization;
    request({
        url: `https://www.polaraccesslink.com/v3/users/${id}`,
        method: 'GET',
        headers: {  'Authorization' : authorization,
                    'Accept': 'application/json;charset=UTF-8'
        }
    }, (error, response, body) => {
        if(error) return res.status(500).send(error);
        return res.status(200).send(response);
    })
}



function createTransaction(req, res) {
    console.log(req.params.id)
    let id = req.params.id;
    let authorization = req.headers.authorization;
    request({
        url: `https://www.polaraccesslink.com/v3/users/${id}/activity-transactions`,
        method: "POST",
        headers: { 'Authorization' : authorization, 'Accept': 'application/json;charset=UTF-8' }
    }, function (error, response, body){
        if(error) return  res.status(500).send(console.log(error));
        console.log('Body transaction: ', body);
        return res.status(200).send(body);
    }); 
}

function activityLog(req, res ) {
    let id = req.params.id;
    let tid = req.params.tid;

    let authorization = req.headers.authorization;
    request({
        url: `https://www.polaraccesslink.com/v3/users/${id}/activity-transactions/${tid}`,
        method: "GET",
        headers: { 'Authorization' : authorization, 'Accept': 'application/json;charset=UTF-8' }
    }, function (error, response, body){
        if(error) return  res.status(500).send(console.log(error));
        console.log('Body activities: ', body);
        return res.status(200).send(body);
    }); 

}

function activitySummary(req, res) {
    console.log(req.body);

    let url = req.body.url;
    let authorization = req.headers.authorization;
    // console.log('Peticion', id, tId, sumId);
    request({
        url: url,
        method: "GET",
        headers: { 'Authorization' : authorization, 'Accept': 'application/json;charset=UTF-8' }
    }, function (error, response, body){
        if(error) return  res.status(500).send(console.log(error));
        console.log('Body activity: ', body);
        return res.status(200).send(body);       
    }); 
}

function commitTransaction(req, res) {
    let id = req.params.id; 
    let tid = req.params.tid; 
    let authorization = req.headers.authorization;
    request({
        url: `https://www.polaraccesslink.com/v3/users/${id}/activity-transactions/${tid}`,
        method: "PUT",
        headers: { 'Authorization' : authorization, 'Accept': 'application/json;charset=UTF-8' }
    }, function (error, response, body){
        if(error) return  res.status(500).send(console.log(error));
        console.log('Body commited data: ', body);
        return res.status(200).send(body);
    }); 
}

function zoneSamples(req, res) {
    console.log('Req params zone samples', req.params);
    let id = req.params.id; //Client ID
    let tid = req.params.tid; //Transaction ID
    let aid = req.params.aid;   //Activity ID
    let authorization = req.headers.authorization;

    console.log('ZONE SAMPLES POLAR');

    // let zoneSamples: any = await this.polar.samples();
    
    // return res.status(200).send(responseExample);
    request({
        url: `https://www.polaraccesslink.com/v3/users/${id}/activity-transactions/${tid}/activities/${aid}/zone-samples`,
        method: "GET",
        headers: { 'Authorization' : authorization, 'Accept': 'application/json;charset=UTF-8' }
    }, async function (error, response, body){
        if(error) return  res.status(500).send(console.log(error));
        if(!body) return res.status(404).send();
        // console.log(body);
        // let response = await normalizeSamples(body);
        let zones = await normalizeSamples(body);
        return res.status(200).send(zones);
    }); 
}

async function normalizeSamples (zoneSamples) {
    zoneSamples = JSON.parse(zoneSamples);
    console.log(zoneSamples);
    let counter = {
        "sleep": 0,    //0
        "resting": 0,   //1
        "walking": 0,   //2
        "cardio": 0,    //3
        "peak": 0,      //4
    };
    zoneSamples.samples.map(day => {
      // console.log('Samples', day.samples);
    //   day.samples.map(zones => { 
        day["activity-zones"].forEach(zones => {
          if(zones.index == 5) return;
          let zone = zones["inzone"].split('PT')[1];
          if(zone.index) zones.index == 1 || zones.index == 2 ? zones.index = 1 : zones.index -= 1;
          if(zone.includes('H')) {
            counter[Object.keys(counter)[zones.index]] += +zone.split('H')[0] * 60;
            zone = zone.split('H')[1];
          }
          if(zone.includes('M')) {
            counter[Object.keys(counter)[zones.index]] += +zone.split('M')[0];
            zone = zone.split('M')[1];
          }
          if(zone.includes('S')) {
            counter[Object.keys(counter)[zones.index]] += parseFloat(zone.split('S')[0]) / 60;
          }
        })
      })
      return counter;
    // })
}

module.exports = {
    polarToken,
    polarUserReg,
    createTransaction,
    polarUserInfo,
    activityLog,
    activitySummary,
    commitTransaction,
    zoneSamples
}