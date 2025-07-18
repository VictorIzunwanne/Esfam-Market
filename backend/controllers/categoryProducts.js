const Product = require("../models/productModel");

exports.getCategory = async (req, res) => {
  try {
    const products = await Product.find({
      category: req.params.clientReq,
    });
    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch products in this category" });
  }
};
