const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Serve static files (HTML/CSS/JS)
app.use(express.static('public'));

// Handle real-time chat
io.on('connection', (socket) => {
  console.log('New user connected:', socket.id);

  // Private messaging
  socket.on('private-message', ({ to, message }) => {
    socket.to(to).emit('private-message', { from: socket.id, message });
  });

  // Disconnect handler
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});