const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");
const roomName = document.getElementById("room-name");
const userList = document.getElementById("users");
// const fs = require("fs");

// Get username and room from URL

const { username, room, email } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});
console.log({ username, room, email });
// const username = fs.readFileSync(`${__dirname}/username.txt`, "utf-8");
// const room = fs.readFileSync(`${__dirname}/room.txt`, "utf-8");
// console.log(username);
// console.log(room);

const socket = io();
// socket.on("error", (msg) => {
//   errorFunc(msg);
// });
// socket.on("sending", (msg) => {
//   const username = msg.name;
//   const room = msg.rooms;
//   console.log(username);
//   console.log(room);
//   console.log("sdfkfjik");
//   socket.emit("joinRoom", { username, room });
// });
socket.on("outputMessage", (result) => {
  syncMessage(result);
});
socket.on("outputUser", async (result1) => {
  const data = await result1;
  syncUser(data);
  // console.log(data);
});
socket.emit("joinRoom", { username, room, email });

//get rooms and users
socket.on("roomUsers", ({ room, users }) => {
  outputRoomName(room);
  outputUser(users);
});

// Message from server
socket.on("message", (message) => {
  // console.log(message);
  outputMessage(message);
  // Scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Message submit
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get message text
  let msg = e.target.elements.msg.value;
  // Emit message to server
  socket.emit("chatMessage", msg);

  // Clear input
  e.target.elements.msg.value = "";
});

// Output message to DOM
function outputMessage(message) {
  const div = document.createElement("div");
  div.classList.add("message");
  div.innerHTML = ` <p class="meta">${message.username} <span>${message.time}</span></p>
 <p class="text">
 ${message.message}
 </p>`;
  document.querySelector(".chat-messages").appendChild(div);
}
function outputRoomName(room) {
  roomName.innerText = room;
}
function outputUser(users) {
  userList.innerHTML = `${users
    .map((user) => `<li>${user.username}</li>`)
    .join("")}`;
}
function syncMessage(result) {
  ` ${result.map((message) => {
    const div = document.createElement("div");
    div.classList.add("message");
    div.innerHTML = ` <p class="meta">${message.username} <span>${message.time}</span></p>
 <p class="text">
 ${message.message}
 </p>`;
    document.querySelector(".chat-messages").appendChild(div);
  })}`;
}
function syncUser(users) {
  console.log(users[1]);
  userList.innerHTML = `${users
    .map((user) => `<li>${user.username}</li>`)
    .join("")}`;
}
// function errorFunc(msg) {
//   const div = document.createElement("div");
//   div.classList.add("message");
//   div.innerHTML = ` <p class="meta">${msg} <span>${msg}</span></p>
//  <p class="text">
//  ${msg}
//  </p>`;
//   document.querySelector(".chat-messages").appendChild(div);
// }
//   const div = document.createElement("div");
//   div.classList.add("message");
//   div.innerHTML = ` ${result.map(
//     (
//       message
//     ) => `<p class="meta">${message.username} <span>${message.time}</span></p>
//  <p class="text">
//  ${message.message}
//  </p><br>`
//   )}`;
//   document.querySelector(".chat-messages").appendChild(div);
//}
