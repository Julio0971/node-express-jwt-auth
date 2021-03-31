const jwt = require('jsonwebtoken')

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

module.exports = { requireAuth }