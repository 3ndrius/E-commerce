const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: [true, "Please enter user name"],
        maxlength: [30, "Your name cannot be more than 30 characters"]
    },
    email: {
        type: String,
        required: [true, "Email adress cannot be empty"],
        unique: true,
        validate: [validator.isEmail, "Please enter a valid email address"]
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minlength: [8, "Your password must be at least 8 characters long"],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date
})

// encrypt password before save 
userSchema.pre('save', async function (next) {

    if(!this.isModified('password'))  next()
    this.password = await bcrypt.hash(this.password, 10)
})

// check password
userSchema.methods.comparePassword = async function(providedPassword) {
    
    return await bcrypt.compare(providedPassword, this.password)
}

// store jwt
userSchema.methods.getJwtToken = function() {

    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE_TIME
    })
}


module.exports = mongoose.model('User', userSchema )
