const { Router } = require('express')
const router = Router()
const smoothie_controller = require('../controllers/smoothie-controller')

router.post('/register', smoothie_controller.register)
router.post('/login', smoothie_controller.login)
router.post('/check', smoothie_controller.check)

module.exports = router