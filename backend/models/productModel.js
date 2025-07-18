const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  customerName: String,
  review: String,
  createdAt: { type: Date, default: Date.now },
});

const productSchema = new mongoose.Schema(
  {
    name: String,
    category: String,
    gender: String,
    description: String,
    primaryImage: String,
    secondaryImage: String,
    thirdImage: String,
    price: String,
    stock: Number,
    reviews: [reviewSchema],
    sellerId: mongoose.Schema.Types.ObjectId,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
