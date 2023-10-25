// backend/server.js
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./models');
const config = require('./config');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const userRoutes = require('./routes/users');

app.use(bodyParser.json());
app.use(cors());

// Database connection setup
db.sequelize.sync();

// Socket.io for real-time functionality
io.on('connection', (socket) => {
  // Handle real-time updates and notifications here
});

// Add your CRUD and authentication routes
app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);
app.use('/users', userRoutes);

http.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
