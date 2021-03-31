const jwt = require('jsonwebtoken')
const User = require('../models/user')

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt

    // Check json web token exists & is verified
    if (token) {
        jwt.verify(token, 'api secret', (err, decodedToken) => {
            if (err) {
                console.log(err.message)
                
                res.redirect('/signin')
            }
            else {
                console.log(decodedToken)
                
                next()
            }
        })
    }
    else {
        res.redirect('/signin')
    }
}

// Check current user
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt

    if (token) {
        jwt.verify(token, 'api secret', async (err, decodedToken) => {
            if (err) {
                console.log(err.message)
                res.locals.user = null
                next()
            }
            else {
                const user = await User.findById(decodedToken.id)
                res.locals.user = user
                next()
            }
        })
    }
    else {
        res.locals.user = null
        next()
    }
}

module.exports = { requireAuth, checkUser }