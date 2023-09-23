const CloseGameService = require("./service/close");

const wsConnection = socket => {
    console.log(`user connected: ${socket.id}`);
    socket.on("message", message => relayMessage(socket, message))
    socket.on("join_game", game => joinGame(socket, game))
    socket.on("game_over", game => closeGame(socket, game))
    socket.on("telemetry", telemetry => relayTelemetry(socket, telemetry))
    socket.on("impact", telemetry => relayImpact(socket, telemetry))
}

const relayMessage = (socket, message) => {
    console.log(message);
    socket.emit("message", message );
}

const joinGame = (socket, game) => {
    socket.join(game)
    console.log(`${socket.id} joined game ${game}`);
}

const relayTelemetry = (socket, telemetry) => {
    socket.to(telemetry.game).emit("telemetry", { "telemetry": telemetry });
}

const relayImpact = (socket, telemetry) => {
    socket.to(telemetry.game).emit("impact", { "telemetry": telemetry });
}

const closeGame = (socket, game) => {
    socket.to(game).emit("game_over", game)
    CloseGameService(game);
}

module.exports = {wsConnection};