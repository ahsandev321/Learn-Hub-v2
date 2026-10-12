const express = require("express")

//Create the content view router.
const contentViewRouter = express.Router()

//Import content view controller functions.
const { contentViewed, getContentViewed, deleteContentViewed } = require("../controller/ContentViewController")

//Record a content view.
contentViewRouter.post("/content-view", contentViewed)

//Get content view records.
contentViewRouter.get("/content-view", getContentViewed)

//Delete content view for specific student and course.
contentViewRouter.delete("/delete-content-viewed/:studentId/:courseId", deleteContentViewed)

module.exports = contentViewRouter 