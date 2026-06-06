const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json("Access denied");
  }

  try {
    const token = authHeader.replace("Bearer ", "");
    const verified = jwt.verify(token, "secretkey");

    req.user = verified;
    next();
  } catch (err) {
    return res.status(400).json("Invalid token");
  }
};

module.exports = verifyToken;