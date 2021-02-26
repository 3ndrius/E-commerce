// inport models
const Product = require("../models/product.model");
const Order = require("../models/order.model");

const createError = require("http-errors");
const catchErrorAsync = require("../../middlewares/catchErrorAsync");

// new order  /api/v1/order POST 
exports.newOrder = catchErrorAsync(async (req, res, next) => {
  const {
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
  } = req.body;

  const order = await Order.create({
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
    paidAt: Date.now(),
    user: req.user._id
  });
  res.status(200).json({
      success: true,
      order
  })
  
});
