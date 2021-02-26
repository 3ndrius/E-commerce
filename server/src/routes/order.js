const express = require("express");
const router = express.Router();

const { newOrder } = require("../controllers/orderController");
const {
  isUserAuthenticated,
  authorizeRoles,
} = require("../../middlewares/isAuth");

router
  .route("/order")
  .post(isUserAuthenticated, newOrder);

module.exports = router;
