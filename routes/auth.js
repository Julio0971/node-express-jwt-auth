const { Router } = require('express')
const router = Router()
const smoothie_controller = require('../controllers/smoothie-controller')

router.get('/register', smoothie_controller.register)
router.get('/login', smoothie_controller.login)
router.post('/register', smoothie_controller.register_post)
router.post('/login', smoothie_controller.login_post)

module.exports = router