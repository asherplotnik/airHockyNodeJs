const express = require("express");
const routes = require("./routes");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const app = express();
app.use(cors());
const server = http.createServer(app);
const port = 3000;
const mongoose = require("mongoose");
const mongoURL = "mongodb://127.0.0.1:27017";
const dbName = "airHockey";
const loginController = require("./service/login");
const wsController = require("./wsController");
const DeleteCollection = require("./service/deleteCollection");
const cron = require('node-cron');
const path = require('path');

mongoose.connect(`${mongoURL}/${dbName}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (error) => console.error("MongoDB connection error:", error));
db.once("open", () => console.log("Connected to MongoDB"));

app.use("/api", routes);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
const ws = io.of("/ws");
ws.on("connection", (socket) => wsController.wsConnection(socket));

app.use(express.static(path.join(__dirname, 'build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

cron.schedule('0 0 * * *', () => DeleteCollection(db));

  
