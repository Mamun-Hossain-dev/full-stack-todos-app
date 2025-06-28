// external imports
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// internal imports
const authRoutes = require("./routes/authRoutes");

// configuration
dotenv.config();
connectDB();
const app = express();

/** middlewares **/
// Enable cross-origin resource sharing
app.use(cors());

// parse JSON data
app.use(express.json());

// parse form data
app.use(express.urlencoded({ extended: true }));

// sub-app routes
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("hello world!");
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(
    `Server is running on port: ${port} in the ${process.env.NODE_ENV} mode`
  );
});
