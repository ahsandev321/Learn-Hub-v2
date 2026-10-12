const mongoose = require("mongoose")

//Define the content view schema.
const contentViewSchema = mongoose.Schema({

    //Reference the student who viewed the content.
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    //Reference the course containing the content.
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true

    },
    //Store the ID of the viewed content.
    content: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    //Specify the type of content being viewed.
    contentType: {
        type: String,
        enum: ["assignment", "videos"],
        required: true
    },



}, { timestamps: true })

//Create the ContentView model.
const ContentView = mongoose.model("ContentView", contentViewSchema)

module.exports = ContentView