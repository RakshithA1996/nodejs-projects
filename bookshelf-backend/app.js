const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv/config");

// Middlewares
const app = express();
app.use(bodyParser.json());

// Import routes
const signupRoutes = require("./routes/users");
app.use("/users", signupRoutes);

// Connect to DB
mongoose
  .connect(process.env.DB_CONNECTION, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    app.listen(8080, () => {
      console.log("DB Connected Successfully");
    });
  })
  .catch((err) => console.log("DB Connection Failed"));
