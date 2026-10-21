const express = require("express");
const Product = require("../models/Product");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { category, search, inStock } = req.query;
    const filter = {};
    if (category && category !== "All Pieces") filter.category = category;
    if (inStock === "true") filter.inStock = true;
    if (search) {
      const safe = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      filter.name = { $regex: safe, $options: "i" };
    }
    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: "Invalid product id" });
  }
});

module.exports = router;