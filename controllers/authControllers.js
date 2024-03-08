const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/userModel");

const loginUser = async function (req, res) {};
const registerUser = async function (req, res) {
  try {
    const { name, regNo, email, phone, password } = req.body;
    console.log(name, regNo, email, phone, password);

    //check if existing user
    const existingUser = await User.findOne({
      $or: [{ regNo: regNo }, { email: email }, { phone: phone }],
    });
    if (existingUser) {
      //if user already exists
      res
        .status(409)
        .json({ error: "User already exists with the entered details" });
    }

    const user = await User.create({ name, regNo, email, phone, password });
    if (!user) {
      // If anything fails during user creation
      res.status(500).json({
        error: "Failed to create the user. Please try again later.",
      });
    }

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  loginUser,
  registerUser,
};
