const Game = require("../schemas/gameSchema");

const JoinGameService = async (User,req,res) => {
    try {
        const game = await Game.findOne(req.name);
        if (game && !game.joiner){
            game.joiner = req.joiner;
            game.save();
            console.log (`joined game: ${game}`);
            res.status(200);
        } else {
            console.log (`game not found: ${games}`);
            res.status(204).json({message:"game not found!"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server error' });
    }

}

module.exports = JoinGameService;