const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
// const pug = require("pug");
const server = http.createServer(app);
const mongoose = require("mongoose");
const userDb = require("./controller/userDB");
const formatMessage = require("./utils/messages");
const chatDb = require("./controller/chatDb");
const deleteDb = require("./controller/userDB");
const Chat = require("./model/chatModel");
const User = require("./model/userModel");
const fs = require("fs");
dotenv.config({ path: "./config.env" });
// var engines = require("consolidate");
app.use(express.static(path.join(__dirname, "_html_css")));
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
} = require("./utils/user");

app.use(express.json());
app.use(cors());
const io = socketio(server);
// app.set("view engine", "pug");
// app.set("views", path.join(__dirname, "_html_css/views"));
// app.use(express.static("./_html_css"));
// app.engine("html", engines.mustache);
// app.set("view engine", "html");
// app.set("views", path.join(__dirname, "_html_css/views"));

const DB = process.env.LINK;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((res) => {
    console.log("connected");
  });

// const db = mongoose.connection;

// db.once("open", () => {
//   const msgCollection = db.collection("users");
//   // console.log(msgCollection);
//   const changeStream = msgCollection.watch();
//   // console.log(changeStream);
//   changeStream.on("change", (change) => {
//     if (change.operationType === "insert") {
//       const msgDetails = change.fullDocument;
//       const name = msgDetails.username;
//       const rooms = msgDetails.room;
//       // console.log({ name, rooms });
//       io.emit("sending", { name, rooms });
//     }
//   });
// });

// app.use(express.static(path.join(__dirname, "public")));
const PORT = process.env.PORT;
io.on("connection", (socket) => {
  console.log("new connection");
  socket.on("joinRoom", async ({ username, room, email }) => {
    Chat.find({ room }).then((result) => {
      if (result) {
        socket.emit("outputMessage", result);
      }
    });
    userDb.insertDataRefresh({ username, room, email });

    // User.find({ room }).then((result1) => {
    //   if (result1) {
    //     console.log(result1);
    //     socket.emit("outputUser", result1);
    //   }
    // });

    const user = userJoin(socket.id, username, room, email);
    socket.join(user.room);
    socket.emit("message", formatMessage("coding team", "welcome"));
    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        formatMessage("coding team", `${user.username} has joined the chat`)
      );
    io.to(user.room).emit("roomUsers", {
      room: user.room,
      users: getRoomUsers(user.room),
    });
  });

  socket.on("chatMessage", (msg) => {
    const user = getCurrentUser(socket.id);
    const data = formatMessage(user.username, msg);
    io.to(user.room).emit("message", data);
    chatDb(data, user.room, socket.id);
  });
  socket.on("disconnect", () => {
    const user = userLeave(socket.id);

    if (user) {
      console.log("fifgjmijmrjio");
      deleteDb.deleteMessages(user.email);
      io.to(user.room).emit(
        "message",
        formatMessage("botName", `${user.username} has left the chat `)
      );

      io.to(user.room).emit("roomUsers", {
        room: user.room,
        users: getRoomUsers(user.room),
      });
    }
  });
});
app.post("/insert", userDb.insertData);
server.listen(PORT, () => {
  console.log(`app is running at ${PORT} port`);
});
