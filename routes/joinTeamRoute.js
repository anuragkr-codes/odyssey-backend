const express = require("express");
const router = express.Router();
const joinTeam = require("../controllers/joinTeamController");
const authenticateToken = require("../middlewares/tokenAuthentication.js");

router.post("/", authenticateToken, joinTeam);

module.exports = router;
