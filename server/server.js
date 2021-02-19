const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// * database connection
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Connect established`);
  })
  .catch((error) => {
    console.log("DB connection:", error.message);
  });

// * middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json({ limit: "2mb" }));

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  // All the javascript and css files will be read and served from this folder
  app.use(express.static("client/build"));

  // index.html for all page routes    html or routing and naviagtion
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

// * looping routes with middlewares
// fs.readdirSync("./routes").map((route) =>
//   app.use("/api", require("./routes/" + route))
// );

app.use("/api", require("./routes/admin.js"));
app.use("/api", require("./routes/auth.js"));
app.use("/api", require("./routes/category.js"));
app.use("/api", require("./routes/cloudinary.js"));
app.use("/api", require("./routes/coupon.js"));
app.use("/api", require("./routes/product.js"));
app.use("/api", require("./routes/stripe.js"));
app.use("/api", require("./routes/subcategory.js"));
app.use("/api", require("./routes/user.js"));

app.listen(PORT, () => console.log(`Server running at ${PORT}`));
