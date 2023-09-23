const Game = require("../schemas/gameSchema");

const JoinGameService = async (req, res) => {
    try {
        const game = await Game.findOne({name: req.query.name});
        if (game && !game.joiner){
            game.deleteOne();
            console.log (`joined game: ${game}`);
            res.status(200).json({message:`joined game: ${game.name}`});
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