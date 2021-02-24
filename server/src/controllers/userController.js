
const User = require('../models/user.model')
const createError = require('http-errors')
const catchErrorAsync = require('../../middlewares/catchErrorAsync')

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
    const token = user.getJwtToken()

    res.status(201).json({
        success: true,
        token
    })
})