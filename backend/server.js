const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

const productSchema = new mongoose.Schema({
  _id: Object,
  name: String,
  category: String,
  for: String,
  description: String,
  price: Number,
  stock: Number,
  sellerId: Object,
});

const productModel = mongoose.model("products", productSchema);

app.get("/products", async (req, res) => {
  try {
    const products = await productModel.find();
    res.json(products);
  } catch (err) {
    console.log("Cannot fetch products", err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

mongoose
  .connect(process.env.mongoDbUrl)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Could not connect to MongoDB", error);
  });

app.listen(process.env.port, () => {
  console.log(
    `Server is started at http://localhost:${process.env.port}/products`
  );
});
