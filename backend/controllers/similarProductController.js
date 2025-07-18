const Product = require("../models/productModel");

exports.getSimilarProducts = async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.itemCategory })
      .sort({ createdAt: -1 })
      .limit(8);

    res.json(products);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch products similar to this product",
      details: error.message,
    });
  }
};
