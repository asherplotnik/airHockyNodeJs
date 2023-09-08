
const wsConnection = socket => {
    console.log(`user connected: ${socket.id}`);
    socket.on("message", (message) => relayMessage(socket, message))
    socket.on("join_game", game => {
        socket.join(game)
        socket.to(game).emit("message", { message: `${socket.id} joined game ${game}` });
        console.log(`${socket.id} joined game ${game}`);
    })
}

const relayMessage = (socket, message) => {
    console.log(message);
    socket.emit("message", { message });
}

module.exports = {wsConnection};