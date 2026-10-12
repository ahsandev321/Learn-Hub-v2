const mongoose = require("mongoose")

//Define the enrollment schema.
const enrollmentSchema = mongoose.Schema({

    //Reference the student who enrolled in the course.
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true

    },
    //Reference the rnrolled course.
    courses: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true

    },
    //Store the enrollment price.
    price: {
        type: Number,
        required: true,
        min: 0
    },
    //Track the enrollment status.
    status: {
        type: String,
        enum: ["active", "completed"],
        default: "active"
    }



}, { timestamps: true })

//Create the Enrollment model.
const Enrollment = mongoose.model("Enrollment", enrollmentSchema)

module.exports = Enrollment