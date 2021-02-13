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
const createToken = (id) => {
    return jwt.sign({ id }, 'api secret', {
        expiresIn: max_age
    })
}

module.exports.register = async (req, res) => {
    const { name, email, password } = req.body

    try {
        const user = await User.create({ name, email, password })
        const token = createToken(user.id)

        res.cookie('jwt', token, { httpOnly: true, maxAge: max_age * 1000 })
        res.status(200).json({ message: 'Registro exitoso' })
    }
    catch (error) {
        const errors = handleErrors(error)
        
        res.status(422).json({ errors })
    }
}

module.exports.login = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.login(email, password)
        const token = createToken(user.id)

        // res.cookie('jwt', token, { httpOnly: true, maxAge: max_age * 1000 })
        res.status(200).json({ message: 'Login exitoso', token })
    }
    catch (error) {
        const errors = handleErrors(error)
        
        res.status(422).json({ errors })
    }
}

module.exports.check = async (req, res) => {
    const token = req.body.token

    if (token) {
        jwt.verify(token, 'api secret', (error, decoded_token) => {
            if (error) {
                console.log(decoded_token)
                res.status(403).json({ message: error.message })
            }
            else {
                res.status(200).json({ auth: true })
            }
        })
    }
    else {
        res.status(403).json({ auth: false })
    }
}