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

// show user's order  /api/v1/orders/

exports.myOrders = catchErrorAsync(async (req, res, next) => {

  const orders = await Order.find({user: req.user.id});

  res.status(200).json({
    success: true,
    orders,
    count: orders.length
  })
})

// show specific order item /api/v1/order/:id

exports.getSingleOrder = catchErrorAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email');
  if(!order) return next(createError.NotFound("That order not exists"))

  res.status(200).json({
    success:true,
    order
  })
})

// show all orders -admin  /api/v1/admin/orders

exports.allOrders = catchErrorAsync(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;
  orders.forEach(order => totalAmount += order.totalPrice)

  res.status(200).json({
    success:true,
    orders,
    totalAmount
  })
})

// update order   => /api/v1/orders/:id PUT  ADMIN
exports.updateOrder = catchErrorAsync(async (req, res, next) => {

  const orders = await Order.findById(req.params.id);

  if(orders.orderStatus === "Delivered") return next(createError.BadRequest("Your order has already been completed"));

  orders.orderItems.forEach(async item => {
    await updateStock(item.product, item.quantity)
  })

  orders.orderStatus = req.body.order;
  orders.deliveredAt = Date.now();
  
  await orders.save();

  res.status(200).json({
    success: true
  })
})

async function updateStock(id, quantity)  {
  const product = await Product.findById(id);
  product.stock = product.stock - quantity;
  await product.save({ validateBeforeSave: false});
}
