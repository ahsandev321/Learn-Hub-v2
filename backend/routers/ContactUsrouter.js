const express = require("express")

const contactUSRouter = express.Router()

//Import middleware to verify the user's JWT token. 
const authMiddleware = require("../middleware/authMiddleware")

//Import the middleware to check the user role and permissions.
const roleMiddleware = require("../middleware/roleMiddleware")

//Import contact message functions.
const { contactUsData, getContactUsData, deleteContactUsData, isReadContactUsData } = require("../controller/ContactUsController")

//send a contact message.
contactUSRouter.post('/contact-us-data', authMiddleware, contactUsData)

//Get all contact message.
contactUSRouter.get('/admin-contact-us-data', authMiddleware, roleMiddleware("admin"), getContactUsData)

//Mark a contact message as read.
contactUSRouter.put('/admin-contact-us-data/mark-read', authMiddleware, roleMiddleware("admin"), isReadContactUsData)

//Delete a contact message.
contactUSRouter.delete('/admin-contact-us-data/:id', authMiddleware, roleMiddleware("admin"), deleteContactUsData)

module.exports = contactUSRouter


