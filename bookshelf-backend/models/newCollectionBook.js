const mongoose = require("mongoose");

const newCollectionBookSchema = mongoose.Schema({
  name: { type: String },
  author: { type: String },
  description: { type: String },
  poster: { type: String },
  publication: { type: String },
  price: { type: Number },
});

module.exports = mongoose.model("newcollectionbooks", newCollectionBookSchema);
