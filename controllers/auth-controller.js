const User = require('../models/user')
const jwt = require('jsonwebtoken')

// Handle errors
const handleErrors = error => {
    let errors = {
        name: '',
        email: '',
        password: ''
    }

    // Incorrect email
    if (error.message == 'Correo incorrecto') {
        errors.email = 'El correo ingresado no existe'
    }

    // Incorrect password
    if (error.message == 'Contraseña incorrecta') {
        errors.password = 'La contraseña ingresada es incorrecta'
    }

    // Duplicate error code
    if (error.code == 11000) {
        errors.email = 'El correo ingresado ya existe'

        return errors
    }

    // Validation errors
    if (error.message.includes('user validation failed')) {
        Object.values(error.errors).map(({ properties }) => {
            errors[properties.path] = properties.message
        })
    }

    return errors
}

// Expires time jwt
const max_age = 3 * 24 * 60 * 60

// Create a jwt token
const createToken = id => {
    return jwt.sign({ id }, 'api secret', {
        expiresIn: max_age
    })
}

// Controller actions
module.exports.signup = (req, res) => {
    res.render('signup');
}

module.exports.signin = (req, res) => {
    res.render('signin');
}

module.exports.register = async (req, res) => {
    const { name, email, password } = req.body

    try {
        const user = await User.create({ name, email, password })
        const token = createToken(user.id)

        res.cookie('jwt', token, { httpOnly: true, maxAge: max_age * 1000 })
        res.status(200).json({ user: user.id })
    }
    catch (error) {
        const errors = handleErrors(error)
        
        res.status(400).json({ errors })
    }
}

module.exports.login = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.login(email, password)
        const token = createToken(user.id)

        res.cookie('jwt', token, { httpOnly: true, maxAge: max_age * 1000 })
        res.status(200).json({ user: user.id })
    }
    catch (error) {
        const errors = handleErrors(error)
        
        res.status(400).json({ errors })
    }
}