const express = require("express");
const router = express.Router();

const {
  newOrder,
  myOrders,
  getSingleOrder,
  allOrders,
  updateOrder,
  deleteOrder
} = require("../controllers/orderController");
const {
  isUserAuthenticated,
  authorizeRoles,
} = require("../../middlewares/isAuth");

router.route("/orders").post(isUserAuthenticated, newOrder);
router.route("/orders").get(isUserAuthenticated, myOrders);
router.route("/order/:id").get(isUserAuthenticated, getSingleOrder);

router.route("/admin/orders").get(isUserAuthenticated, authorizeRoles('admin'), allOrders);
router.route("/admin/orders/:id").put(isUserAuthenticated, authorizeRoles('admin'), updateOrder)
                                 .delete(isUserAuthenticated, authorizeRoles('admin'), deleteOrder);

module.exports = router;
