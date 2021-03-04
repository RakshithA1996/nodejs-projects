const mongoose = require("mongoose");

const booksSchema = mongoose.Schema({
  name: { type: String },
  author: { type: String },
  publisher: { type: String },
  description: { type: String },
  poster: { type: String },
  price: { type: Number },
});

module.exports = mongoose.model("popularbooks", booksSchema);
