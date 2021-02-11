const User = require('../models/user')

// Handle errors
const handleErrors = error => {
    let errors = {
        name: '',
        email: '',
        password: ''
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

module.exports.register = (req, res) => {
    res.render('auth/register', { title: 'Registro' })
}

module.exports.login = (req, res) => {
    res.render('auth/login', { title: 'Iniciar sesión' })
}

module.exports.register_post = async (req, res) => {
    const { name, email, password } = req.body

    try {
        const user = await User.create({
            name,
            email,
            password
        })

        res.status(200).json(user)
    }
    catch (error) {
        const errors = handleErrors(error)
        
        res.status(422).json({ errors })
    }
}

module.exports.login_post = async (req, res) => {
    const { email, password } = req.body

    try {
        
    }
    catch (error) {
        console.log(error)
    }
}