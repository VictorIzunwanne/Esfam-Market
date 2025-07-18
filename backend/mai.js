// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const dotenv = require("dotenv");
// dotenv.config();

// const app = express();

// app.use(
//   cors({
//     origin: "*",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//   })
// );

// const productSchema = new mongoose.Schema({
//   _id: mongoose.Schema.Types.ObjectId,
//   name: String,
//   category: String,
//   for: String,
//   description: String,
//   price: Number,
//   stock: Number,
//   sellerId: mongoose.Schema.Types.ObjectId,
// });

// const productModel = mongoose.model("products", productSchema);

// app.get("/products", async (req, res) => {
//   try {
//     const products = await productModel.find();
//     res.json(products);
//   } catch (err) {
//     console.log("Cannot fetch products", err);
//     res.status(500).json({ error: "Failed to fetch products" });
//   }
// });

// mongoose
//   .connect(process.env.mongoDbUrl)
//   .then(() => {
//     console.log("Connected to MongoDB");
//   })
//   .catch((error) => {
//     console.log("Could not connect to MongoDB", error);
//   });

// app.listen(process.env.port, () => {
//   console.log(
//     `Server is started at http://192.168.15.213:${process.env.port}/products`
//   );
// });

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const uploadRoutes = require("./routes/uploadRoutes");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

// Routes
app.use("/api/upload", uploadRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
