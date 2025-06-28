const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

// hash password before save
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// instance method for comparing password
userSchema.methods.matchedPassword = async function (enteredPassword) {
  return enteredPassword
    ? await bcrypt.compare(enteredPassword, this.password)
    : false;
};

// export the User model
module.exports = model("User", userSchema);
