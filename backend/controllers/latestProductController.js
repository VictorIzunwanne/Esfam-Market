const Product = require("../models/productModel");

exports.getLatestProducts = async (req, res) => {
  try {
    const latestProducts = await Product.find()
      .sort({
        createdAt: -1,
      })
      .limit(4);
    res.json(latestProducts);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch products with the category of fashion",
      details: error.message,
    });
  }
};
