const Game = require("../schemas/gameSchema");

const GamesService = async (req, res) => {
  try {
    const games = await Game.find();
    if (!games) {
      console.log("no open games games yet:");
      res.status(204);
    } else {
      res.status(200).json(games);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = GamesService;
