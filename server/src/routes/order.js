const express = require("express");
const router = express.Router();

const {
  newOrder,
  myOrders,
  getSingleOrder,
} = require("../controllers/orderController");
const {
  isUserAuthenticated,
  authorizeRoles,
} = require("../../middlewares/isAuth");

router.route("/order").post(isUserAuthenticated, newOrder);
router.route("/orders").get(isUserAuthenticated, myOrders);
router.route("/order/:id").get(isUserAuthenticated, getSingleOrder);
module.exports = router;
