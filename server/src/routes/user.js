const express = require('express')
const router = express.Router()

const { registerUser, loginUser, logoutUser, forgotPassword } = require('../controllers/userController')

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').get(logoutUser)
router.route('/password/reset').post(forgotPassword)

module.exports = router