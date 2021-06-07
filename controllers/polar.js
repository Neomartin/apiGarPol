var request = require('request');

function polarToken(req, res) {
    let authorization = req.headers.authorization;
    let data = `grant_type=authorization_code&code=${req.body.code}`;
    
    request({
        url: "https://polarremote.com/v2/oauth2/token",
        method: "POST",
        // json: true,
        body: data,
        headers: { 'Authorization' : authorization, 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json;charset=UTF-8' }
    }, function (error, response, body){
        if(error) return  res.status(500).send(console.log(error));
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

module.exports = {
    polarToken,
    polarUserReg,
    createTransaction,
    polarUserInfo,
    activityLog,
    activitySummary,
    commitTransaction
}