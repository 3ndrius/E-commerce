const express = require('express')
const router = express.Router()

const { getProducts, newProduct, getSingleProduct, updateProduct, deleteProduct } = require('../controllers/productController')
const { isUserAuthenticated } = require('../../middlewares/isAuth')

router.route('/products').get(getProducts)
router.route('/products').post(isUserAuthenticated, newProduct)
router.route('/products/:id').get(getSingleProduct)
router.route('/admin/products/:id').put(isUserAuthenticated, updateProduct)
router.route('/admin/products/:id').delete(isUserAuthenticated,deleteProduct)

module.exports = router