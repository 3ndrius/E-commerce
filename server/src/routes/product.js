const express = require('express')
const router = express.Router()

const { getProducts, newProduct, getSingleProduct } = require('../controllers/productController')

router.route('/products').get(getProducts)
router.route('/products').post(newProduct)
router.route('/products/:id').get(getSingleProduct)

module.exports = router