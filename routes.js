const express = require("express");
const router = express.Router();
const LoginService = require("./service/login");
const GamesService = require("./service/games");
const CreateGameService = require("./service/create");
var bodyParser = require("body-parser");
const JoinGameService = require("./service/join");
var jsonParser = bodyParser.json();

router.post("/login", jsonParser, (req, res) => {
  LoginService(User, req, res);
});

router.get("/games", (req, res) => {
  GamesService();
});

router.post("/create", jsonParser, (req, res) => {
    CreateGameService(User, req, res);
});

router.get("/join", (req, res) => {
    JoinGameService();
});




module.exports = router;
