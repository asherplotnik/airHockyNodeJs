const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  name: { type: String, required: true },
  creator: { type: String, required: true },
  joiner: { type: String, required: false },
  created: { type: Date, default: Date.now() },
});

const Game = mongoose.model("Games", gameSchema);

module.exports = Game;
