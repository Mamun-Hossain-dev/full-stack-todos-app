const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Successfully connect mongoDB");
  } catch (err) {
    console.log("Error connecting mongoDB", err);
  }
};

module.exports = connectDB;
