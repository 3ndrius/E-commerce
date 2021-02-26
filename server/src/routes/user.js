const express = require('express')
const router = express.Router()
const { isUserAuthenticated } = require('../../middlewares/isAuth')
const { registerUser, loginUser, logoutUser, resetPassword, updatePassword, forgotPassword, getUserProfile, updateProfile } = require('../controllers/userController')

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/me/update').put(isUserAuthenticated, updateProfile)
router.route('/me').get(isUserAuthenticated, getUserProfile)
router.route('/password/forgot').post(forgotPassword)
router.route('/password/reset/:token').put(resetPassword)
router.route('/password/update').put(isUserAuthenticated, updatePassword)
router.route('/logout').get(logoutUser)

module.exports = router