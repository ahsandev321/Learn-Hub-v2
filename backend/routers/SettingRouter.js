const express = require("express")

const settingrouter = express.Router()

//Import middleware to verify the user's JWT token. 
const authMiddleware = require("../middleware/authMiddleware")

//Import the settings functions.
const { getUserdata, updateUsername, updateUserEmail, updateUserPassword } = require("../controller/authController")

//Get user details.
settingrouter.get('/users-data/:userId', authMiddleware, getUserdata)

//Update the user's name.
settingrouter.put('/update-name/:userId', authMiddleware, updateUsername)

//Update the user's email
settingrouter.put('/update-email/:userId', authMiddleware, updateUserEmail)

//Update the user's password.
settingrouter.put('/update-password/:userId', authMiddleware, updateUserPassword)


module.exports = settingrouter