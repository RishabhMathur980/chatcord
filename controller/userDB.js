const User = require("../model/userModel");
const fs = require("fs");
exports.insertData = async (req, res, next) => {
  const { username, room, email } = req.body;
  // console.log({ username, room });

  const data = await User.create({ username, room, email });
  res.status(200).json({
    data,
  });
};
exports.insertDataRefresh = async ({ username, room, email }) => {
  console.log("this is insert data ");
  // const { username, room, email } =
  // console.log({ username, room });

  const data = await User.create({ username, room, email });
  // res.status(200).json({
  //   data,
  // });
};

exports.deleteMessages = async (email) => {
  const data2 = await User.findOneAndDelete({ email });
};
