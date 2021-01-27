const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8000;

// * database connection
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
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

// * routes
app.get("/api", (req, res) => {
  res.json({
    data: "node API",
  });
});

app.listen(PORT, () => console.log(`Server running at ${PORT}`));
