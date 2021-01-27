const express = require("express");
const router = express.Router();

router.get("/create-update-user", (req, res) => {
  res.json({
    data: "create-update-user",
  });
});

module.exports = router;
