
const User = require('../models/user.model')
const createError = require('http-errors')
const catchErrorAsync = require('../../middlewares/catchErrorAsync')
const sendToken = require('../../utils/jwtToken')

// register user => /api/v1/register 
exports.registerUser =  catchErrorAsync( async (req, res, next) => {

    const { name, email, password } = req.body

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: 'avatars/matrix-neo-man-white-512_cmkac9',
            url: "https://res.cloudinary.com/dunx5etc6/image/upload/v1614170534/avatars/matrix-neo-man-white-512_cmkac9.webp"
        }
    })
    sendToken(user, 200, res)
})

exports.loginUser = catchErrorAsync ( async (req, res, next) =>{

    const { email, password } = req.body
    
    if(!email && !password)  return next(createError.NotFound("Please enter your email or password"))

    const user = await User.findOne({email}).select('+password')

    if(!user) return next(createError.Unauthorized('Your email or password are not correct'))

    const isPasswordCorrect = await user.comparePassword(password)

    if(!isPasswordCorrect) return next(createError.Unauthorized('Your password is incorrect'))

   sendToken(user, 200, res)
})

exports.logoutUser = catchErrorAsync (async (req,res,next) => {

    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly:true
    })
    res.status(200).json({
        success:true,
        message: "Logout"
    })
})