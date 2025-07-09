require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI;
const FRONTEND_URL = process.env.FRONTEND_URL;
const PORT = process.env.PORT || 3001;

if (!MONGO_URI) {
  console.error("FATAL ERROR: MONGO_URI environment variable is not set.");
  process.exit(1);
}

const app = express();
const server = http.createServer(app);

app.use(cors({ origin: FRONTEND_URL }));
app.use(express.json());

const io = new Server(server, {
  cors: {
    origin: FRONTEND_URL,
    methods: ["GET", "POST"]
  }
});

const WhiteboardSchema = new mongoose.Schema({
  roomId: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  content: {
    type: String,
    default: ""
  }
}, { timestamps: true });

const Whiteboard = mongoose.model('Whiteboard', WhiteboardSchema);

io.on('connection', (socket) => {
  console.log(`[Socket] New client connected: ${socket.id}`);

  socket.on('join_room', async (roomId) => {
    try {
      socket.join(roomId);
      console.log(`[Socket] Client ${socket.id} joined room: ${roomId}`);
      
      const board = await Whiteboard.findOneAndUpdate(
        { roomId: roomId },
        { $setOnInsert: { roomId: roomId, content: "" } },
        { upsert: true, new: true }
      );

      socket.emit('load_content', board.content);

    } catch (error) {
      console.error(`[Error] Failed to join room or load board for ${roomId}:`, error);
      socket.emit('load_error', 'Could not load the whiteboard.');
    }
  });

  socket.on('drawing', (data) => {
    socket.to(data.roomId).emit('drawing', data);
  });

  socket.on('clear', async ({ roomId }) => {
    try {
      socket.to(roomId).emit('clear');
      await Whiteboard.findOneAndUpdate({ roomId }, { content: "" });
      console.log(`[DB] Board cleared for room: ${roomId}`);
    } catch (error) {
       console.error(`[Error] Failed to clear board for ${roomId}:`, error);
    }
  });

  socket.on('save_board', async ({ roomId, content }) => {
    try {
      await Whiteboard.findOneAndUpdate(
        { roomId },
        { content },
        { upsert: true }
      );
      console.log(`[DB] Board saved for room: ${roomId}`);
      socket.emit('save_success', 'Board saved successfully!');
    } catch (error)
    {
      console.error(`[Error] Failed to save board for ${roomId}:`, error);
      socket.emit('save_error', 'Could not save the board.');
    }
  });

  socket.on('disconnect', () => {
    console.log(`[Socket] Client disconnected: ${socket.id}`);
  });
});

app.get('/', (req, res) => {
  res.send('Whiteboard server is running.');
});

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('[DB] MongoDB Connected Successfully.');
    server.listen(PORT, () => {
      console.log(`[Server] Listening on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('[DB] MongoDB Connection Error:', err);
    process.exit(1);
  });