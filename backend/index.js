const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const connectDB = require("./config/db");

const authRouter = require("./controllers/authController"); // Make sure this points to the correct file
const quizRouter = require("./controllers/quizController");
const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
// For passes whole request to mongoDB as it is( doesn't ignore outliers)
mongoose.set("strictQuery", false);

connectDB();

// Use middleware
app.use(express.json());
// For nested objects
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/auth", authRouter); // Ensure this correctly routes to the AuthRouter !
app.use("/quizzes", quizRouter);

// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT}`);
});
