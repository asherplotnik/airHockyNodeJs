const Game = require("../schemas/gameSchema");

const CloseGameService = async(reqGame) => {
    try {
        const game = await Game.findOne({name: reqGame});
        if (game){
            console.log (`game over: ${game}`);
            game.deleteOne();
        } else {
            console.log (`game not found: ${games}`);
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = CloseGameService;