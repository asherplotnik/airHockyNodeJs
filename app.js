const express = require('express');
const http = require('http'); // Import the http module
const { Server } = require('socket.io'); // Import Socket.io
const cors = require('cors');
const app = express();
app.use(cors());
const server = http.createServer(app);
const port = 3000
const wsController = require('./wsController');
const io = new Server(server,{
    cors: {
        origin: 'http://localhost:5173', 
        methods: ["GET","POST"]
    }
}); 
const ws = io.of("/ws");
ws.on("connection", socket => wsController.wsConnection(socket))

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});