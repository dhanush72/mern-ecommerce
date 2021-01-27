const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
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

// * looping routes with middlewares
fs.readdirSync("./routes").map((route) =>
  app.use("/api", require("./routes/" + route))
);

app.listen(PORT, () => console.log(`Server running at ${PORT}`));
