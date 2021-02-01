const express = require("express");
const router = express.Router();

// * middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");
// * controllers
const { create, relistAll } = require("../controllers/product");

router.post("/product", authCheck, adminCheck, create);
router.get("/products/:count", relistAll);

module.exports = router;
