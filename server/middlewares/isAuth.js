const catchErrorAsync = require('../middlewares/catchErrorAsync')
const jwt = require('jsonwebtoken')
const createError = require('http-errors')
const User = require('../src/models/user.model')

exports.isUserAuthenticated = catchErrorAsync( async (req, res, next) => {

    const { token } = req.cookies

    if(!token) return next(createError.Unauthorized("You have to login to acces this resoure"))

    const decodedToken = jwt.decode(token, process.env.JWT_SECRET)

    req.user = await User.findById(decodedToken.id) 

    next()

})

exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)) next(createError.Forbidden(`Role: ${req.user.role} are not allowed to access that resources`))
        next()
    }
}