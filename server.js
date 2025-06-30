// external imports
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");

// internal imports
const authRoutes = require("./routes/authRoutes");
const todoRoutes = require("./routes/todoRoutes");

// configuration
dotenv.config();
connectDB();
const app = express();

/** middlewares **/
// Enable cross-origin resource sharing
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

// parse JSON data
app.use(express.json());

// parse cookies
app.use(cookieParser());

// parse form data
app.use(express.urlencoded({ extended: true }));

// sub-app routes
app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

app.get("/", (req, res) => {
  res.send("Hello world!");
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(
    `Server is running on port: ${port} in the ${process.env.NODE_ENV} mode`
  );
});
