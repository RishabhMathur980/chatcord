const mongoose = require("mongoose");
const validator = require("validator");
// const validator = require("validator");
const userSchema = mongoose.Schema({
  // key: String,
  username: String,
  room: String,
  email: {
    type: String,
    validate: [validator.isEmail],
  },
});
module.exports = mongoose.model("user", userSchema);
