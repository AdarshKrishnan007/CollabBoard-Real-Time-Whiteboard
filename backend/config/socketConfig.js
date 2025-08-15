const boardData = {};
function handleSocketEvents(socket, io) {
  socket.on("draw", (data) => {
    // Broadcast drawing data to others
    if (!boardData[boardId]) {
      boardData[boardId] = [];
    }
    boardData[boardId].push(data); // Save stroke

    socket.to(boardId).emit("draw", data);
  });

  socket.on("clear-canvas", (boardId) => {
    boardData[boardId] = [];
    socket.to(boardId).emit("clear-canvas");
  });

  socket.on("join-board", (boardId) => {
    socket.join(boardId);
    console.log(`${socket.id} joined board: ${boardId}`);
    if (boardData[boardId]) {
      socket.emit("load-board", boardData[boardId]);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
}

module.exports = { handleSocketEvents };
