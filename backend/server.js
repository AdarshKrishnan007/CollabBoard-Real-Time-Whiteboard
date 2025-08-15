// server.js
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

require("dotenv").config();

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

const io = new Server(server, {
  cors: {
    origin: "*", // Change to frontend origin in production
    methods: ["GET", "POST"],
  },
});

// Store room states in memory
const rooms = {}; // { roomId: { leaderId, participants: [], sessionActive: false } }

io.on("connection", (socket) => {
  console.log("New user connected:", socket.id);

  // Join a room
  socket.on("join-room", ({ roomId }) => {
    socket.join(roomId);

    // If room does not exist → this person is leader
    if (!rooms[roomId]) {
      rooms[roomId] = {
        leaderId: socket.id,
        participants: [],
        sessionActive: false,
      };
    }

    // Add participant
    rooms[roomId].participants.push(socket.id);

    // Tell the user if they are leader
    const isLeader = rooms[roomId].leaderId === socket.id;
    socket.emit("role", {
      isLeader,
      sessionActive: rooms[roomId].sessionActive,
    });

    // Update participants list
    io.to(roomId).emit("participants-update", rooms[roomId].participants);

    console.log(
      `User ${socket.id} joined room ${roomId}, Leader: ${rooms[roomId].leaderId}`
    );
  });

  // Handle session control (leader only)
  socket.on("session-control", ({ roomId, active }) => {
    if (rooms[roomId] && rooms[roomId].leaderId === socket.id) {
      rooms[roomId].sessionActive = active;
      io.to(roomId).emit("session-status", { active });
    }
  });

  // Drawing events
  socket.on("draw", (data) => {
    if (rooms[data.roomId]?.sessionActive) {
      socket.to(data.roomId).emit("draw", data);
    }
  });

  // Disconnect
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    for (let roomId in rooms) {
      rooms[roomId].participants = rooms[roomId].participants.filter(
        (id) => id !== socket.id
      );

      // If leader left → promote first participant as leader
      if (rooms[roomId].leaderId === socket.id) {
        rooms[roomId].leaderId = rooms[roomId].participants[0] || null;
        io.to(roomId).emit("role", {
          isLeader: socket.id === rooms[roomId].leaderId,
          sessionActive: rooms[roomId].sessionActive,
        });
      }
    }
  });
});

app.get("/", (req, res) => {
  res.send("Whiteboard Collaboration Server");
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
