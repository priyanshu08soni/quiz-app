const jwt = require("jsonwebtoken");

const ensureAuthenticated = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({
      message: "Unauthorized, JWT token is required",
    });
  }

  // Expect format: "Bearer <token>"
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized, Bearer token missing",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attach user info from token
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Unauthorized, token invalid or expired",
    });
  }
};

module.exports = ensureAuthenticated;
