var tokenGenerator = require('../helpers/jwt');

async function renewToken(req, res) {
    var user = req.user;

    const token = await tokenGenerator.createJWT(user);
   //  console.log('Token', token);
    return res.status(200).send({ ok: true, message: 'Token renovado', token});
}

function checkToken(req, res) {
    // Working automatically 
}

module.exports = {
    renewToken,
    checkToken
}