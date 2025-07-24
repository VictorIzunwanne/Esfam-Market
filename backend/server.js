const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();

dotenv.config();

app.use(cookieParser());
app.use(
  cors({
    origin: "http://192.168.118.213:4200",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const addReview = require("./routes/productRoutes");
const getSimilarProducts = require("./routes/similarProductsRoutes");
const getLatestProducts = require("./routes/latestProductRoutes");
const getCategories = require("./routes/categoryProducts");
const logAdmin = require("./routes/adminRoutes");
const AdminSchema = require("./routes/getAdminDataRoutes");
const userLogin = require("./routes/loginRoutes");
const userSignUp = require("./routes/signupRoutes");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/products", addReview);
app.use("/api", getSimilarProducts);
app.use("/api/latest-products", getLatestProducts);
app.use("/api", getCategories);
app.use("/api/admins", logAdmin);
app.use("/api/admin-data", AdminSchema);
app.use("/api/users", userLogin);
app.use("/api/users/signup", userSignUp);

app.listen(process.env.PORT, () => {
  console.log(`Server is started at http://192.168.118.213:${process.env.port}/api/`);
});
