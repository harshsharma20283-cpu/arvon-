const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    originalPrice: Number,
    image: String,
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
    badge: String,
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
