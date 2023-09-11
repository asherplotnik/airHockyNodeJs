
const wsConnection = socket => {
    console.log(`user connected: ${socket.id}`);
    socket.on("message", message => relayMessage(socket, message))
    socket.on("join_game", game => joinGame(socket, game))
    socket.on("telemetry", telemetry => relayTelemetry(socket, telemetry))
}

const relayMessage = (socket, message) => {
    console.log(message);
    socket.emit("message", { message });
}

const joinGame = (socket, game) => {
    socket.join(game)
    socket.to(game).emit("message", { message: `${socket.id} joined game ${game}` });
    console.log(`${socket.id} joined game ${game}`);
}

const relayTelemetry = (socket, telemetry) => {
    socket.to(telemetry.game).emit("telemetry", { "telemetry": telemetry });
   // socket.emit("telemetry", { telemetry: telemetry });
}

module.exports = {wsConnection};