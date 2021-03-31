const { Router } = require('express')
const router = Router()
const auth_controller = require('../controllers/auth-controller')

router.get('/signup', auth_controller.signup)
router.get('/signin', auth_controller.signin)
router.post('/register', auth_controller.register)
router.post('/login', auth_controller.login)

module.exports = router