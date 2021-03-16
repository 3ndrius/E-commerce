const Product = require("../models/product.model");
const createError = require("http-errors");
const catchErrorAsync = require("../../middlewares/catchErrorAsync");
const APIFeatures = require("../../utils/apiFeatures");

// Create new product => /api/v1/product/ GET
exports.newProduct = catchErrorAsync(async (req, res, next) => {
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  if (!product) throw createError.NotFound("Products not found");
  res.status(201).json({
    success: true,
    product,
  });
});

// Get all Products  => /api/v1/product/ POST

exports.getProducts = catchErrorAsync(async (req, res, next) => {
  let resPerPage = 6;
  const productCount = await Product.countDocuments();
  const apiFeatures = new APIFeatures(Product.find(), req.query)
    .search()
    .filter();

    let products = await apiFeatures.query;
    const filteredProductsCount = products.length;

    apiFeatures.pagination(resPerPage);
    


  products = await apiFeatures.query;

  if (!products) return next(createError.BadRequest());
  res.status(200).json({
    success: true,
    productCount,
    count: products.length,
    filteredProductsCount,
    products,
    resPerPage,
  });
});
// get sinle product => /api/v1/product/{id} GET
exports.getSingleProduct = catchErrorAsync(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) return next(createError.NotFound());
  res.status(200).json({
    success: true,
    product,
  });
});

// edit product => /api/v1/product/{id} PUT
exports.updateProduct = catchErrorAsync(async (req, res, next) => {
  let product = await Product.findByIdAndUpdate(req.params.id, req.body);
  if (!product) throw createError.NotFound("Product not found");
  res.status(200).json({
    success: true,
    product,
  });
});

// delete product  => /admin/api/product/{id}  DELETE

exports.deleteProduct = catchErrorAsync(async (req, res) => {
  let product = await Product.findByIdAndDelete(req.params.id);
  if (!product) throw createError.NotFound("Product cannot be deleted");

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});

// add and update review - /api/v1/reviews  PUT

exports.updateReviews = catchErrorAsync(async (req, res, next) => {
  const { productId, ratings, comment } = req.body;

  const reviews = {
    name: req.user.name,
    ratings: Number(ratings),
    comment,
    user: req.user._id,
  };

  const product = await Product.findById(productId);
  const isReviewd = product.reviews.find(
    (r) => r.user.toString() === req.user._id.toString()
  );
  if (isReviewd) {
    product.reviews.forEach((review) => {
      if (review.user.toString() === req.user._id.toString()) {
        review.comment = comment;
        review.ratings = ratings;
      }
    });
  } else {
    product.reviews.push(reviews);
    product.numOfReviews = product.reviews.length;
  }
  product.ratings =
    product.reviews.reduce((acc, item) => item.ratings + acc, 0) /
    product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({ success: true });
});

// display product reviews  /api/v1/reviews   GET

exports.getProductReviews = catchErrorAsync(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// delete review  /api/v1/reviews DELETE
exports.deleteReview = catchErrorAsync(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  const reviews = product.reviews.filter(
    (review) => review._id.toString() !== req.query.id.toString()
  );

  const numOfReviews = reviews.length;
  const ratings =
    product.reviews.reduce((acc, item) => item.ratings + acc, 0) /
    reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    { ratings, reviews, numOfReviews },
    { new: true, runValidators: true, useFindAndModify: false }
  );
  res.status(200).json({
    success: true,
  });
});
