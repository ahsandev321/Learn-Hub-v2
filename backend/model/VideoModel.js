const mongoose = require("mongoose")

//Define video schema.
const videoSchema = mongoose.Schema({

    //Store the video title.
    title: {
        type: String,
        required: true
    },
    //Store the uploaded video URL.
    videoUrl: {
        type: String,
        required: true
    },
    //Store the cloudinary public ID.
    videoPublicId: {
        type: String,
        required: true
    },
    //Reference the course associated with the video.
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true
    }

}, { timestamps: true })

//Create the Video model.
const Video = mongoose.model("Video", videoSchema)

module.exports = Video