const Game = require("../schemas/gameSchema");
const User = require("../schemas/userSchema");
const CreateGameService = async (req,res) => {
    try {
        if (!req.body) {
            res.status(400).json({});
            console.log("bad request");
            return;
        }
        const gameReq = req.body;
        const game = await Game.findOne({ name : gameReq.name });
        const creator = await User.findOne({userId: gameReq.creator });
        if (!creator) {
            res.status(400).json({});
            console.log("user invalid!");
            return;
        }
        if (!game){
            const saveGame = new Game({name: gameReq.name, creator: creator.userName, created: Date.now()});
            await saveGame.save();
            console.log (`Game created: ${gameReq.name}`);
            res.status(201).json(gameReq.name);
        } else {
            console.log ("Game already exists!");
            res.status(400).json({message:"Game already exists"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server error' });
    }

}

module.exports = CreateGameService;