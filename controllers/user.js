var User = require('../models/user');

var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

var tokenGenerator = require('../helpers/jwt');
var salt = 10;

function register(req, res) {
    // User from BODY POST
    // console.log('USEr', req.body);
    // return res.status(200).send({ok: true, req: req.body});
    var user = new User(req.body);

    user.username ? user.username.toLowerCase() : user.username = user.modelName.split(' ')[0];
    user.email = user.email.toLowerCase();
    if(user.password) {
        bcrypt.hash(user.password, salt, (err, hash) => {
            if(err) return res.status(500).send({ ok: false, error: err, message: 'Error al guarda el usuario '});

            user.password = hash;
            user.save((err, stored) => {
                console.log('Stored: ', stored);
                if(err) return res.status(500).send({ ok: false, error: err, message: 'Error al guarda el usuario '});
                if(!stored) return res.status(404).send({ ok: false, message: 'El usuario no fue cargado revise los datos ingresados.'});

                return res.status(200).send({ ok: true, message: 'Usuario ASANTE geneerado con éxito', user: stored });
            })
        })
    }
}

function login(req, res) {
    var username = req.body.email.toLowerCase();
    var password = req.body.password;

    if(username && password) {
        User.findOne({
            $or: [
                { username: username },
                { email: username }
            ]
        })
        .exec((err, user) => {
            if (err) return res.status(500).send({ ok: false, message: 'Error al obtener usuario.'});
            if (!user) return res.status(404).send({ ok: false, message: 'Usuario no encontrado'});
            
            /////////////////////////////////////
            //   Comprobación del password    //
            ////////////////////////////////////
            bcrypt.compare(password, user.password, (err, result) => {
                if(result) {
                    user.password = undefined; //remove pass from User response
                    ///////////////////////////////
                    // Generación del JWT        //
                    ///////////////////////////////
                    tokenGenerator.createJWT(req.user).then( token => {
                        return res.status(200).send({
                            ok: true,
                            message: 'Login correcto',
                            token: token,
                            user: user
                        })
                    }).catch(err => {
                        return res.status(500).send({ ok: false, message: 'Internal error JWT'});
                    });
                }
            });
        });
    }
}

module.exports = {
    register,
    login
}
