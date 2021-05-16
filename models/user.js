'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var beatifyUnique = require('mongoose-beautiful-unique-validation');


var rolesValidos = {
    name: [
        // access_level 1 y 4 avaible
        'ADMIN_ROLE',
        'USER_ROLE',
        'CLIENT_ROLE',
    ],
    access_level: [
        2,
        1,
        0
    ],
    viewValue: [
        'Administrador',
        'Usuario',
        'Cliente'
    ],
    message: '{VALUE} no es un Rol permitido.'
}
var UserSchema = Schema({
    name: { type: String, required: [true, 'El nombre es necesario.'] },
    surname: { type: String, required: [ true, 'El apellido es necesario.' ]},
    email: { type: String, required: false, unique: true, sparse: true},
    username: { type: String, unique: [ true, 'El usuario ya existe.'], required: false},
    password: { type: String },
    role: { 
            name: { type: String, default: 'CLIENT_ROLE', required: true, enum: rolesValidos.name },
            access_level: { type: Number, default: 0, required: true, enum: rolesValidos.access_level },
            viewValue: { type: String, default: 'Cliente', required: true, enum: rolesValidos.viewValue }
    },
    created_at: { type: Number, default: Date.now() }
});

UserSchema.plugin(beatifyUnique);


module.exports = mongoose.model('User', UserSchema);