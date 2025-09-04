const jwt = require("jsonwebtoken");

const ensureAuthenticated = (req, res, next) => {
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    return res.status(401).json({
      message: "Unauthorized, JWT token is required",
    });
  }

  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(401).json({
      message: "Unauthorized, Bearer token missing or malformed",
    });
  }

  const token = parts[1];

  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET not configured");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    return next();
  } catch (err) {
    return res.status(401).json({
      message: "Unauthorized, token invalid or expired",
    });
  }
};

module.exports = ensureAuthenticated;
