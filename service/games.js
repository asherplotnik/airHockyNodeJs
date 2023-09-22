
const GamesService = async (User,req,res) => {
    try {

        const games = await Game.findAll();
        if (!games){
            console.log ("no open games games yet:");
            res.status(204);
        } else {
            console.log (`open games: ${games}`);
            res.status(200).json(games);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server error' });
    }

}

module.exports = GamesService;