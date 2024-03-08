const express = require("express");
const router = express.Router();

const {
  loginUser,
  registerUser,
} = require("../controllers/authControllers.js");

router.post("/login", (req, res) => {
  loginUser(req, res);
});

router.post("/register", (req, res) => {
  registerUser(req, res);
});

module.exports = router;
