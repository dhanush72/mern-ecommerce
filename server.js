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

if (process.env.NODE_ENV === "production") {
  // Exprees will serve up production assets
  app.use(express.static("client/build"));

  // Express serve up index.html file if it doesn't recognize route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// * looping routes with middlewares
fs.readdirSync("./routes").map((route) =>
  app.use("/api", require("./routes/" + route))
);

app.listen(PORT, () => console.log(`Server running at ${PORT}`));
