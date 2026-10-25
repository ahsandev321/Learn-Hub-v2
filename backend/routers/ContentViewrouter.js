const express = require("express")

//Create the content view router.
const contentViewRouter = express.Router()

//Import middleware to verify the user's JWT token. 
const authMiddleware =require("../middleware/authMiddleware")

//Import content view controller functions.
const { contentViewed, getContentViewed, deleteContentViewed } = require("../controller/ContentViewController")

//Record a content view.
contentViewRouter.post("/content-view", authMiddleware, contentViewed)

//Get content view records.
contentViewRouter.get("/content-view", authMiddleware, getContentViewed)

//Delete content view for specific student and course.
contentViewRouter.delete("/delete-content-viewed/:studentId/:courseId", authMiddleware, deleteContentViewed)

module.exports = contentViewRouter 