const User = require("../models/User");
const jwt = require("jsonwebtoken");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/generateToken");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExits = await User.findOne({ email });
    if (userExits) return res.status(400).json({ msg: "User already exits" });

    const user = await User.create({ name, email, password });

    // creating tokens
    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);
    // set cookies
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      samesite: "lax",
      maxAge: 7 * 14 * 60 * 60 * 1000,
    });

    res.status(201).json({
      msg: "user created successfully",
      user: { id: user._id, name: user.name },
      accessToken,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !user.matchedPassword(password)) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    // creating tokens
    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);
    // set cookies
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      samesite: "lax",
      maxAge: 7 * 14 * 60 * 60 * 1000,
    });

    res.status(200).json({
      msg: "successfully logged user",
      user: { id: user._id, name: user.name },
      accessToken,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const refresh = async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(401).json({ msg: "No refresh token" });

  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    const accessToken = generateAccessToken(decoded.id);
    res.json({ accessToken });
  } catch (err) {
    res.status(403).json({ error: "token err: ", err });
  }
};

const logout = async (req, res) => {
  res
    .clearCookie("refreshToken", {
      httpOnly: true,
      samesite: "lax",
      secure: process.env.NODE_ENV === "production",
    })
    .json({ msg: "logged out successfully" });
};

module.exports = {
  register,
  login,
  refresh,
  logout,
};
