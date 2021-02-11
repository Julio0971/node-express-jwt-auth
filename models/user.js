const mongoose = require('mongoose')
const { isEmail } = require('validator')

const user_schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Ingresa un nombre']
    },
    email: {
        type: String,
        required: [true, 'Ingresa un correo electrónico'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Ingresa un correo electrónico válido']
    },
    password: {
        type: String,
        required: [true, 'Ingresa una contraseña'],
        minlength: [8, 'La longitud mínima de la contraseña es de 8 caracteres']
    }
}, { timestamps: true })

const User = mongoose.model('user', user_schema)

module.exports = User