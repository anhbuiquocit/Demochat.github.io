const express = require("express");
const path = require("path");
const http = require("http");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const FormatMessage = require("./utils/message");
const { userJoin, getCurrentUser } = require("./utils/user");
const io = socketio(server);
//set static folder
app.use(express.static(path.join(__dirname, "public")));

const botName = "ChatBot";

//Run when client connect
io.on("connection", (socket) => {
  socket.on("joinRoom", ({ username, room }) => {
    const user = userJoin(socket.id, username, room);

    socket.join(user.room);
    // Welcome to the chat
    socket.emit("message", FormatMessage(botName, `Welcome to ${user.username}`));

    //BroadCast when a user connects
    socket.broadcast
      .to(user.room)
      .emit("message", FormatMessage(botName, `${user.username} has joined the chat`));
  });
  console.log("new connection");

  // Listen for chatMessage
  socket.on("chatMessage", (msg) => {
      const user = getCurrentUser(socket.id)

    console.log(msg);
    io.to(user.room).emit("message", FormatMessage(user.username, msg));
  });

  //Run when user disconnect
  socket.on("disconnect", () => {
    io.emit("message", FormatMessage(botName, "A user has left the chat"));
  });
});
const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server is runing on port ${PORT}`));
