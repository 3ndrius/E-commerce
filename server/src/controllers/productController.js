const Product = require("../models/product.model")
const createError = require("http-errors")
const catchErrorAsync = require("../../middlewares/catchErrorAsync")
const APIFeatures = require('../../utils/apiFeatures')

// Create new product => /api/v1/product/ GET
exports.newProduct = catchErrorAsync(async (req, res, next) => {

  const product = await Product.create(req.body);
  if (!product) throw createError.NotFound("Products not found");
  res.status(201).json({ 
    success: true,
    product,
  })
})

// Get all Products  => /api/v1/product/ POST

exports.getProducts = catchErrorAsync(async (req, res, next) => {

  let resPerPage = 4
  const productCount = await Product.countDocuments()
  const apiFeatures = new APIFeatures(Product.find(), req.query).search().filter().pagination(resPerPage)
  const products = await apiFeatures.query

  if (!products) return next(createError.BadRequest());
  res.status(200).json({
    success: true,
    productCount,
    count: products.length,
    products,
  })
})
// get sinle product => /api/v1/product/{id} GET
exports.getSingleProduct = catchErrorAsync(async (req, res, next) => {

  let product = await Product.findById(req.params.id);
  if (!product) return next(createError.NotFound());
  res.status(200).json({
    success: true,
    product,
  })
})

// edit product => /api/v1/product/{id} PUT
exports.updateProduct = catchErrorAsync(async (req, res, next) => {

  let product = await Product.findByIdAndUpdate(req.params.id, req.body);
  if (!product) throw createError.NotFound("Product not found");
  res.status(200).json({
    success: true,
    product,
  })
})

// delete product  => /admin/api/product/{id}  DELETE

exports.deleteProduct = catchErrorAsync(async (req, res) => {

  let product = await Product.findByIdAndDelete(req.params.id);
  if (!product) throw createError.NotFound("Product cannot be deleted");

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  })
})
