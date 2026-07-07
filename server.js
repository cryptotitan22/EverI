// Ei server e traditional database (MongoDB/MySQL etc) nai.
// Kintu message gula EKTA SIMPLE JSON FILE e save hoy, jate delete na hoy
// ar server restart korleo age r shob message thake.
// messages.json file ta repo er shathei thakbe (git e commit hobe).

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");
const fs = require("fs");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

const PORT = process.env.PORT || 3000;
const MESSAGES_FILE = path.join(__dirname, "messages.json");

// static frontend serve kora hocche
app.use(express.static(path.join(__dirname, "public")));

// ---------- File-based storage helpers ----------
// Kono message DELETE kora hoy na, shudhu notun message APPEND kora hoy.

function loadMessages() {
  try {
    if (!fs.existsSync(MESSAGES_FILE)) {
      fs.writeFileSync(MESSAGES_FILE, "[]", "utf-8");
    }
    const raw = fs.readFileSync(MESSAGES_FILE, "utf-8");
    return JSON.parse(raw || "[]");
  } catch (err) {
    console.error("Message file load korte problem hoyeche:", err);
    return [];
  }
}

function saveMessage(message) {
  const messages = loadMessages();
  messages.push(message);
  fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2), "utf-8");
}

// ---------- Online users (memory only) ----------
const onlineUsers = new Map(); // socket.id -> username

io.on("connection", (socket) => {
  console.log("Notun user connect hoyeche:", socket.id);

  // Notun user connect hobar shathe shathe agerkar shob message pathiye deya
  socket.emit("message-history", loadMessages());
  socket.emit("online-count", onlineUsers.size);

  // user jokhon nam diye join korbe
  socket.on("join", (username) => {
    const cleanName = (username || "").trim() || "Anonymous";
    onlineUsers.set(socket.id, cleanName);

    const systemMsg = {
      type: "system",
      text: `${cleanName} chat e eshechen`,
      time: new Date().toLocaleTimeString()
    };
    io.emit("system", systemMsg);
    io.emit("online-count", onlineUsers.size);
  });

  // message asle save kora hoy AR shobar kache pathiye deya hoy
  socket.on("chat-message", (msgText) => {
    const text = (msgText || "").trim();
    if (!text) return;

    const username = onlineUsers.get(socket.id) || "Anonymous";
    const message = {
      type: "chat",
      user: username,
      text: text,
      time: new Date().toLocaleTimeString(),
      timestamp: Date.now()
    };

    saveMessage(message); // <-- FILE e save hocche, delete kokhono hoy na
    io.emit("chat-message", message);
  });

  socket.on("typing", () => {
    const username = onlineUsers.get(socket.id);
    if (username) {
      socket.broadcast.emit("typing", username);
    }
  });

  socket.on("disconnect", () => {
    const username = onlineUsers.get(socket.id);
    if (username) {
      io.emit("system", {
        type: "system",
        text: `${username} chole gechen`,
        time: new Date().toLocaleTimeString()
      });
    }
    onlineUsers.delete(socket.id);
    io.emit("online-count", onlineUsers.size);
  });
});

server.listen(PORT, () => {
  console.log(`Server chalu ache: http://localhost:${PORT}`);
});
