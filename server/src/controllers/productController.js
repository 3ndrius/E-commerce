const Product = require("../models/product.model");

// Create new product => /api/v1/product/ GET
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

// Get all Products  => /api/v1/product/ POST

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

// get sinle product => /api/v1/product/{id} GET

exports.getSingleProduct = async (req, res, next) => {
    try {
       
        let product = await Product.findById(req.params.id)
        res.status(200).json({
            success: true,
            product
        })
    } catch (error) {
        res.status(404).json({
            success: false,
            error: error.message
        })
    }
}

// edit product => /api/v1/product/{id} PUT

exports.updateProduct = async (req, res, next) => {
  try {
    let product = await Product.findByIdAndUpdate(req.params.id , req.body)
    res.status(200).json({
      success:true,
      product
    })
  } catch (error) {
    res.status(400).json({
      success:false,
      error: error.message
    })
    
  }

}

// delete product  => /admin/api/product/{id}  DELETE

exports.deleteProduct = async (req, res) => {
  try {
    let product = await Product.findByIdAndDelete(req.params.id)
    res.status(200).json({
      success:true,
      message: "Product deleted successfully",
    })
  } catch (error) {
    res.status(400).json({
      success:false,
      error:error.message
    })
  }
}