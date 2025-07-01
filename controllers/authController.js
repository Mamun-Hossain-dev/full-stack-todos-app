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
    res
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 15 * 60 * 1000, // 15 minutes
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

    res.status(201).json({
      msg: "user created successfully",
      user: { id: user._id, name: user.name },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchedPassword(password))) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    // creating tokens
    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);
    // set cookies
    res
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 15 * 60 * 1000, // 15 minutes
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

    res.status(200).json({
      msg: "successfully logged user",
      user: { id: user._id, name: user.name },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const refresh = async (req, res) => {
  const token = req.cookies?.refreshToken;
  if (!token) return res.status(401).json({ msg: "No refresh token" });

  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    const accessToken = generateAccessToken(decoded.id);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    res.json({ success: true });
  } catch (err) {
    res.status(403).json({ error: "token err: ", err });
  }
};

const logout = async (req, res) => {
  res
    .clearCookie("refreshToken", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    })
    .json({ msg: "logged out successfully" });
};

const getMe = async (req, res) => {
  res.json(req.user);
};

module.exports = {
  register,
  login,
  refresh,
  logout,
  getMe,
};
