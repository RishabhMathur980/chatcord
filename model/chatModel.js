const mongoose = require("mongoose");
const chatSchema = mongoose.Schema({
  username: String,
  message: String,
  time: String,
  room: String,
  key: String,
});
module.exports = mongoose.model("chats", chatSchema);
