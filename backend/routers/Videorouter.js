const express = require("express")

//Create the video router.
const videorouter = express.Router()

//Configure file upload middleware.
const upload = require("../middleware/multer")

//Import video controller functions.
const { uploadVideo, getUploadVideo, deleteUploadVideo, updateVideo } = require('../controller/Videocontroller')

//Upload a new video.
videorouter.post("/videos", upload.single("video"), uploadVideo)

//Update an existing video and optionally replace its file.
videorouter.put("/videos/:id", upload.single("video"), updateVideo)

//Get video for a specific course.
videorouter.get("/videos", getUploadVideo)

//Delete a video by ID.
videorouter.delete("/videos/:id", deleteUploadVideo)

module.exports = videorouter
