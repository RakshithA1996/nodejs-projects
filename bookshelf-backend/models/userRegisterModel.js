const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  mobilenumber: {
    type: Number,
    required: true,
  },
  emailaddress: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("users", userSchema);
