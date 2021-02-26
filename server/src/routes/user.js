const express = require('express')
const router = express.Router()
const { isUserAuthenticated } = require('../../middlewares/isAuth')
const { registerUser, loginUser, logoutUser, resetPassword, forgotPassword, getUserProfile } = require('../controllers/userController')

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/me').get(isUserAuthenticated, getUserProfile)
router.route('/password/forgot').post(forgotPassword)
router.route('/password/reset/:token').put(resetPassword)
router.route('/logout').get(logoutUser)

module.exports = router