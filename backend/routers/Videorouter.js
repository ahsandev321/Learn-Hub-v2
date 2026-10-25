const express = require("express")

//Create the video router.
const videorouter = express.Router()

//Configure file upload middleware.
const upload = require("../middleware/multer")

//Import middleware to verify the user's JWT token. 
const authMiddleware =require("../middleware/authMiddleware")

//Import the middleware to check the user role and permissions.
const roleMiddleware =require("../middleware/roleMiddleware")

//Import video controller functions.
const { uploadVideo, getUploadVideo, deleteUploadVideo, updateVideo } = require('../controller/Videocontroller')

//Upload a new video.
videorouter.post("/videos", authMiddleware, upload.single("video"), roleMiddleware("instructor"), uploadVideo)

//Update an existing video and optionally replace its file.
videorouter.put("/videos/:id", authMiddleware, upload.single("video"), roleMiddleware("instructor"), updateVideo)

//Get video for a specific course.
videorouter.get("/videos", authMiddleware, getUploadVideo)

//Delete a video by ID.
videorouter.delete("/videos/:id", authMiddleware, roleMiddleware("instructor"), deleteUploadVideo)

module.exports = videorouter
