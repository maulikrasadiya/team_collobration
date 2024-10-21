const express = require('express');
const app = express();
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('./database/db');
const authRoute = require('./routes/authRoute');
const taskRoute = require('./routes/taskRoute');
const chatRoute = require('./routes/chatRoute');

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api/tasks', taskRoute);
app.use('/api/chat', chatRoute);

const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('New client connected');
  socket.on('sendMessage', (message) => {
    io.to(message.room).emit('receiveMessage', message);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));