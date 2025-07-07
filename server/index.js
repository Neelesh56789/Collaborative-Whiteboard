const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const db = require('./database');

const app = express();
app.use(cors());
app.use(express.json({ limit: '5mb' }));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", // Using "*" for simplicity during debugging
    methods: ["GET", "POST"]
  },
  maxHttpBufferSize: 5e6
});

io.on('connection', (socket) => {
  console.log(`[SERVER] User Connected: ${socket.id}`);

  socket.on('join_room', (roomId) => {
    socket.join(roomId);
    console.log(`[SERVER] User ${socket.id} joined room: ${roomId}`);
  });

  // THE DEFINITIVE FIX IS HERE
  socket.on('drawing', (data) => {
    // We log the room ID to ensure the server is receiving it correctly.
    console.log(`[SERVER] Received drawing event for room: ${data.roomId}`);
    if (data.roomId) {
      socket.to(data.roomId).emit('drawing', data);
    }
  });

  socket.on('clear', (data) => {
    console.log(`[SERVER] Received clear event for room: ${data.roomId}`);
    if (data.roomId) {
      socket.to(data.roomId).emit('clear');
    }
  });

  socket.on('disconnect', () => {
    console.log(`[SERVER] User Disconnected: ${socket.id}`);
  });
});

// API Routes for Persistence...
app.get('/api/board/:roomId', async (req, res) => {
  try {
    const board = await db.Whiteboard.findByPk(req.params.roomId);
    if (board) {
      res.json({ content: board.content });
    } else {
      res.status(200).json({ content: null });
    }
  } catch (error) {
    res.status(500).send('Error loading board');
  }
});

app.post('/api/board', async (req, res) => {
  try {
    const { roomId, content } = req.body;
    const [board, created] = await db.Whiteboard.findOrCreate({
      where: { roomId: roomId },
      defaults: { content: content }
    });
    if (!created) {
      board.content = content;
      await board.save();
    }
    res.status(200).send('Board saved');
  } catch (error) {
    res.status(500).send('Error saving board');
  }
});


const PORT = process.env.PORT || 3001;
db.sequelize.sync().then(() => {
  server.listen(PORT, () => {
    console.log(`[SERVER] Server is running on port ${PORT}`);
  });
});