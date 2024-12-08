const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  Username: String,
  Password: String,
  Role: String,
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;

