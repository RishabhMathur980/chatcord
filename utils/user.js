//join user to chat
const User = require("./../model/userModel");
const users = [];

// const userJoin = async (key, username, room, email) => {
//   const user = { key, username, room, email };
//   const data = await User.find({ email });
//   // console.log("dscfdjuhij");
//   // users.push(user);

//   return user;
// };
function userJoin(id, username, room, email) {
  const user = { id, username, room, email };
  // console.log("dscfdjuhij");
  users.push(user);
  // console.log(users);
  return user;
}

//get the current user
// const getCurrentUser = async (key) => {
//   const user = await User.find({ key });
//   return user;
// };
function getCurrentUser(id) {
  return users.find((user) => user.id === id);
}
function userLeave(id) {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    // console.log(users.splice(index, 1));
    return users.splice(index, 1)[0];
  }
}
// const userLeave = async (key) => {
//   const leave = await User.findOneAndDelete({ key });
//   return leave;
// };
// console.log(users);
// const getRoomUsers = async (room) => {
//   try {
//     const rooms = await User.find(room);
//     // console.log(rooms);
//     return rooms;
//   } catch (err) {
//     console.log(err);
//   }
// };
function getRoomUsers(room) {
  return users.filter((user) => user.room === room);
}
module.exports = { userJoin, getCurrentUser, userLeave, getRoomUsers };
