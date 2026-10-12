const Video = require("../model/VideoModel")

const { uploadvideofiles, deletefile } = require('../config/Cloudinary')


//Upload a new course video.
const uploadVideo = async (req, res) => {
    try {

        //Ensure a video file is selected.
        if (!req.file) {
            return (
                console.log("Video file is not required")
            )
        }

        //Upload the video to cloudinary.
        const courseVideo = await uploadvideofiles(req.file.path)

        if (!courseVideo) {
            return (
                console.log("Video upload failed")
            )
        }

        //Save video details un the database.
        const video = await Video.create({
            title: req.body.title,
            videoUrl: courseVideo.secure_url,
            videoPublicId: courseVideo.public_id,
            course: req.body.courseId

        })

        res.send({
            success: true,
            message: "Video upload successfully",
            data: video

        })



    } catch (error) {

        res.status(500).json(error.message)
    }
}

//Update video details and replace the file if provided.
const updateVideo = async (req, res) => {
    try {

        const video = await Video.findById(req.params.id)

        if (!video) {
            console.log("video not found")
        }

        //Upload the new video and remove the old file.
        if (req.file) {

            const editVideo = await uploadvideofiles(req.file.path)

            await deletefile(video.videoPublicId, "video")

            video.videoUrl = editVideo.secure_url
            video.videoPublicId = editVideo.public_id
        }

            //Update the video title and course.
            video.title = req.body.title,
            video.course = req.body.courseId

        await video.save()

        res.send({
            success: true,
            message: "Video update successfully"
        })

    } catch (error) {

        res.status(500).json(error.message)
    }
}

//Get all videos for a specific course.
const getUploadVideo = async (req, res) => {
    try {

        const courseId = req.query.courseId

        const videos = await Video.find({
            course: courseId
        })

        res.send({
            success: true,
            data: videos
        })

    } catch (error) {

        res.status(500).json(error.message)
    }
}

//Delete a video and its cloudinary files.
const deleteUploadVideo = async (req, res) => {
    try {

        const video = await Video.findById(req.params.id)

        if (!video) {
            console.log("video not found")
        }

        await deletefile(video.videoPublicId, "video")

        await Video.findByIdAndDelete(req.params.id)

        res.send({
            success: true,
            message: "Video delete successfully"
        })

    } catch (error) {

        res.status(500).json(error.message)
    }
}

module.exports = {
    uploadVideo,
    updateVideo,
    getUploadVideo,
    deleteUploadVideo
}