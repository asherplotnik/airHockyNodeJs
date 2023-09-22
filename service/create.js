const Game = require("../schemas/gameSchema");

const CreateGameService = async (User,req,res) => {
    try {
        if (!req.body) {
            res.status(400).json({});
            console.log("empty request");
            return;
        }
        const gameReq = req.body;
        const game = await User.findOne({ name : gameReq.name });
        if (!game){
            const saveGame = new Game({name: gameReq.name, creator: gameReq.creator, created: Date.now});
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