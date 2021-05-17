var SEED = require('../config/config').SEED;
var jwt = require('jsonwebtoken');

exports.ensureAuth = function(req, res, next) {
    // console.log('Authorization', req.headers);
    if(!req.headers.authorization) return res.status(401).send({ ok: false, message: 'Token necesario'});
    var token = req.headers.authorization.replace(/['"]+/g, '');

    jwt.verify(token, SEED, (err, decoded) => {
        if (err) return res.status(401).send({ ok: false, message: 'Token incorrecto o vencido'});
        req.user = decoded.user;
        next();
    });
}