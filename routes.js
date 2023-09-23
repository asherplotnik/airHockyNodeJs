const express = require("express");
const router = express.Router();
const LoginService = require("./service/login");
const GamesService = require("./service/games");
const CreateGameService = require("./service/create");
var bodyParser = require("body-parser");
const JoinGameService = require("./service/join");
const User = require("./schemas/userSchema");
var jsonParser = bodyParser.json();

router.post("/login", jsonParser, (req, res) => {
  LoginService(User, req, res);
});

router.get("/games", (req, res) => {
  GamesService(req, res);
});

router.post("/create", jsonParser, (req, res) => {
    CreateGameService(req, res);
});

router.get("/join", (req, res) => {
    JoinGameService(req, res);
});




module.exports = router;
