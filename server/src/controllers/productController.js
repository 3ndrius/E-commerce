const Product = require("../models/product.model");

// Create new product => /api/v1/product/
exports.newProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
    console.log(error);
  }
};

// Get all Products  => /api/v1/product/

exports.getProducts = async (req, res, next) => {
  try {
    let products = await Product.find({})
    res.status(200).json({
      success: true,
      count: products.length,
      products,
    })
  } catch (error) {
      res.status(400).json({
          success: false,
          error: error.message
      })
  }
};
