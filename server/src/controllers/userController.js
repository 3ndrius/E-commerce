const User = require("../models/user.model");
const createError = require("http-errors");
const catchErrorAsync = require("../../middlewares/catchErrorAsync");
const sendToken = require("../../utils/jwtToken");
const sendEmail = require("../../utils/sendEmail");
const crypto = require("crypto");
var cloudinary = require('cloudinary').v2;

// register user => /api/v1/register
exports.registerUser = catchErrorAsync(async (req, res, next) => {
  const { name, email, password } = req.body;
 
  const result = await cloudinary.uploader.upload(req.body.avatar, {
    folder: "avatars",
     width: 150,
     crop: 'scale'
  });
  
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: result.public_id,
      url:result.secure_url
    }
  });
  sendToken(user, 200, res);
});

exports.loginUser = catchErrorAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email && !password)
    return next(createError.NotFound("Please enter your email or password"));

  const user = await User.findOne({ email }).select("+password");

  if (!user)
    return next(
      createError.Unauthorized("Your email or password are not correct")
    );

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect)
    return next(createError.Unauthorized("Your password is incorrect"));

  sendToken(user, 200, res);
});
// logout
exports.logoutUser = catchErrorAsync(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logout",
  });
});

exports.getUserProfile = catchErrorAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

exports.updatePassword = catchErrorAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const istMatchPassword = await user.comparePassword(req.body.oldPassword);
  if (!istMatchPassword)
    return next(createError.BadRequest("Provided password is not correct"));
  user.password = req.body.password;
  await user.save();
  sendToken(user, 200, res);
});

//update profile

exports.updateProfile = catchErrorAsync(async (req, res, next) => {
  console.log(req.body.email);
  const newProfile = {
    name: req.body.name,
    email: req.body.email,
  };
  const user = await User.findByIdAndUpdate(req.user.id, newProfile, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
  });
});

//restore password
exports.forgotPassword = catchErrorAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return next(createError.NotFound("User not found with this email"));

  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  // create reset pass url

  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`;

  const message = `Your password reset token is: \n\n${resetUrl}\n\n If u have not requested this email then ignore this message. `;

  try {
    await sendEmail({
      email: user.email,
      subject: "E-commerce password recovery",
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to: ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save({ validateBeforeSave: false });
    console.log(error);
    return next(createError.InternalServerError("Server error occured!"));
  }
});

exports.resetPassword = catchErrorAsync(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpires: { $gt: Date.now() },
  });
  if (!user) return next(createError.BadRequest("Token is invalid or expired"));

  if (req.body.password !== req.body.confirmPassword)
    return next(createError.BadRequest("Provided password are not same"));

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;

  await user.save();

  sendToken(user, 200, res);
});

exports.getAllUsers = catchErrorAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    users,
  });
});

exports.getUserDetails = catchErrorAsync(async (req, res, next) => {
  const singleUser = await User.findById(req.params.id);

  if (!singleUser)
    return next(createError.NotFound(`User with ${req.params.id} not found`));

  res.status(200).json({
    success: true,
    user: singleUser,
  });
});

// update user  /api/v1/admin/users/:id
exports.updateUser = catchErrorAsync(async (req, res, next) => {
  const newProfile = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };
  const user = await User.findByIdAndUpdate(req.params.id, newProfile, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
  });
});
// delete single user   /api/v1/admin/users/:id
exports.deleteUser = catchErrorAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user)
    return next(createError.NotFound(`User with ${req.params.id} not found`));

  await user.remove();
  res.status(200).json({
    success: true,
  });
});
