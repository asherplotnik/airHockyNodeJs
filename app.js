const express = require("express");
const routes = require("./routes");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const app = express();
app.use(cors());
const server = http.createServer(app);
const port = 3000;
const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");
const mongoURL = "mongodb://127.0.0.1:27017";
const dbName = "airHockey";
const User = require("./schemas/userSchema");
const loginController = require("./service/login");
const wsController = require("./wsController");
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
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});
const ws = io.of("/ws");
ws.on("connection", (socket) => wsController.wsConnection(socket));

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
