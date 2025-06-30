const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
  const token = req.cookies?.accessToken;

  if (!token)
    return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = { _id: decoded.id };
    next();
  } catch (err) {
    res.status(401).json({ msg: "Invalid token" });
  }
};

module.exports = protect;
