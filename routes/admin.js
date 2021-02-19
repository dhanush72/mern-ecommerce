const express = require("express");
const router = express.Router();

const { authCheck, adminCheck } = require("../middlewares/auth");
const { orders, updateOrder } = require("../controllers/admin.js");

router.put("/admin/update-order", authCheck, adminCheck, updateOrder);
router.get("/admin/orders", authCheck, adminCheck, orders);

module.exports = router;
