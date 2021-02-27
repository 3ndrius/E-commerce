const express = require("express");
const router = express.Router();

const {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  updateReviews,
  getProductReviews,
  deleteReview
} = require("../controllers/productController");

const {
  isUserAuthenticated,
  authorizeRoles,
} = require("../../middlewares/isAuth");

router.route("/products").get(getProducts);
router
  .route("/products")
  .post(isUserAuthenticated, authorizeRoles("admin"), newProduct);
router.route("/products/:id").get(getSingleProduct);
router.route("/admin/products/:id").put(isUserAuthenticated, updateProduct);
router.route("/admin/products/:id").delete(isUserAuthenticated, deleteProduct);
router.route("/reviews").put(isUserAuthenticated, updateReviews)
                        .get(isUserAuthenticated, getProductReviews)
                        .delete(isUserAuthenticated, deleteReview)
module.exports = router;
