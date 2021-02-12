const express = require("express");
const router = express.Router();

const { authCheck } = require("../middlewares/auth");
const {
  userCart,
  getUserCart,
  emptyCart,
  userAddress,
  createOrder,
  orders,
  applyCoupon,
} = require("../controllers/user");

router.post("/user/cart", authCheck, userCart);
router.get("/user/cart", authCheck, getUserCart);
router.delete("/user/cart", authCheck, emptyCart);

router.post("/user/address", authCheck, userAddress);
router.post("/user/order", authCheck, createOrder);
router.get("/user/orders", authCheck, orders);
router.post("/user/cart/coupon", authCheck, applyCoupon);

module.exports = router;
