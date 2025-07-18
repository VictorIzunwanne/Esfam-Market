const Product = require("../models/productModel");

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch products", details: error.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ error: "No data received" });
    }

    const {
      name,
      category,
      gender,
      description,
      price,
      primaryImage,
      secondaryImage,
      thirdImage,
      stock,
      reviews,
      sellerId,
    } = req.body;

    if (
      !name ||
      !category ||
      !gender ||
      !description ||
      !price ||
      !primaryImage ||
      !secondaryImage ||
      !thirdImage ||
      !stock ||
      !reviews ||
      !sellerId
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const product = new Product({
      name,
      category,
      gender,
      description,
      price,
      primaryImage,
      secondaryImage,
      thirdImage,
      stock,
      reviews,
      sellerId,
    });

    const saved = await product.save();

    res
      .status(201)
      .json({ message: "Product uploaded successfully", product: saved });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addReview = async (req, res) => {
  try {
    const { productId } = req.params;
    const { customerName, review } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const newReview = {
      customerName,
      review,
    };

    product.reviews.push(newReview);
    await product.save();

    res.status(200).json({ message: "Review added", reviews: product.reviews });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.getMenProducts = async (req, res) => {
  try {
    const products = await Product.find({
      gender: "men",
    })
      .sort({ createdAt: -1 })
      .limit(8);

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

exports.getWomenProducts = async (req, res) => {
  try {
    const products = await Product.find({ gender: "women" })
      .sort({
        createdAt: -1,
      })
      .limit(8);

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProductsByCategory = async (req, res) => {
  try {
    const products = await Product.find({
      category: req.params.productCategories,
    }).limit(8);

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
