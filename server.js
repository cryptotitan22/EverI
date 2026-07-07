// ei server e kono database nai.
// message gula khali connected user der majhe relay kora hoy,
// kothao save hoy na. server restart dile shob gone.

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" } // dev/simple use er jonno open rakha hoyeche
});

const PORT = process.env.PORT || 3000;

// static frontend serve kora hocche
app.use(express.static(path.join(__dirname, "public")));

// শুধু in-memory তে online user list track করা হবে (kono file/DB e save hobe na)
const onlineUsers = new Map(); // socket.id -> username

io.on("connection", (socket) => {
  console.log("Notun user connect hoyeche:", socket.id);

  // user jokhon nam diye join korbe
  socket.on("join", (username) => {
    onlineUsers.set(socket.id, username || "Anonymous");
    io.emit("system", `${onlineUsers.get(socket.id)} chat e eshechen`);
    io.emit("online-count", onlineUsers.size);
  });

  // message asle sathe sathe shobar kache pathiye deya hocche, kono save nai
  socket.on("chat-message", (msg) => {
    const username = onlineUsers.get(socket.id) || "Anonymous";
    io.emit("chat-message", {
      user: username,
      text: msg,
      time: new Date().toLocaleTimeString()
    });
  });

  // typing indicator (optional feature)
  socket.on("typing", () => {
    const username = onlineUsers.get(socket.id) || "Anonymous";
    socket.broadcast.emit("typing", username);
  });

  socket.on("disconnect", () => {
    const username = onlineUsers.get(socket.id);
    if (username) {
      io.emit("system", `${username} chole gechen`);
    }
    onlineUsers.delete(socket.id);
    io.emit("online-count", onlineUsers.size);
  });
});

server.listen(PORT, () => {
  console.log(`Server chalu ache: http://localhost:${PORT}`);
});
