const chatModel = require("../model/chatModel");
const Chat = require("../model/chatModel");
const getMessages = async (data, room, id) => {
  const data2 = await Chat.create({
    username: data.username,
    message: data.message,
    time: data.time,
    room: room,
    key: id,
  });
};
module.exports = getMessages;
