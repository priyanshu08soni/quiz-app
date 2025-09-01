const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { signupValidation, loginValidation } = require("../middlewares/AuthValidation"); // import your Joi validations
const authController = require("express").Router();

authController.post("/signup", signupValidation, async (req, res) => {
  try {
    const { email, username } = req.body;

    // Check for duplicate email
    const isExistingEmail = await User.findOne({ email });
    if (isExistingEmail) {
      return res.status(409).json({
        message: "Already such an account with this email. Try a new one!",
        success: false,
      });
    }

    // Check for duplicate username
    const isExistingUsername = await User.findOne({ username });
    if (isExistingUsername) {
      return res.status(409).json({
        message: "Already such an account with this username. Try a new one!",
        success: false,
      });
    }

    // Create new user
    const newUser = await User.create({ ...req.body });

    // Generate JWT
    const jwtToken = jwt.sign(
      { email: newUser.email, _id: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(201).json({
      message: "Signup Success",
      success: true,
      jwtToken,
      email: newUser.email,
      userId: newUser._id,
      name: newUser.name,
      username: newUser.username,
    });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
});

authController.post("/login", loginValidation, async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(403).json({
        message: "No account found with this email",
        field: "email",
        success: false,
      });
    }

    // Check password
    if (!(await user.matchPassword(password))) {
      return res.status(403).json({
        message: "Incorrect password",
        field: "password",
        success: false,
      });
    }

    // Generate JWT
    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      message: "Login Success",
      success: true,
      jwtToken,
      email: user.email,
      userId: user._id,
      name: user.name,
      username: user.username,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
});

module.exports = authController;
