const express = require("express");

//Create a authentication router.
const signuprouter = express.Router();

//Import authentication functions.
const { signupUser, loginUser } = require("../controller/authController")

//Register a new user.
signuprouter.post("/signup", signupUser)

//Authenticate an existing user.
signuprouter.post("/login", loginUser)

module.exports = signuprouter;