const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: {type: String, required: true },
  userId: {type: String, required: true},
  userGame: {type: String, required: false}
});

const User = mongoose.model("Users", userSchema);

module.exports = User;
