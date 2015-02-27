module.exports = function(io) {
  io.on("connection", function(socket) {
    socket.on("change", function(data) {
      console.log(data);
      socket.broadcast.emit("change", data);
    });
  });
};
