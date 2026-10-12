const mongoos = require("mongoose")

//Define the student assignment schema.
const studentAssignmentschema = mongoos.Schema({

    //Reference the student who sunmitted the assignment.
    student: {
        type: mongoos.Schema.Types.ObjectId,
        ref: "User",
        required: true

    },
    //Reference the original assignmnet.
    assignment: {
        type: mongoos.Schema.Types.ObjectId,
        ref: "Assignment",
        required: true

    },
    //Track whether the assignment has been read.
    isRead: {
        type: Boolean,
        default: false
    },
    //Store the student's submission description.
    description: {
        type: String,
    },
    //Store the uploaded submission file URL.
    fileUrl: {
        type: String,
        required: true
    },
    //Store the file cloudinary public ID.
    filePublicId: {
        type: String,
        required: true
    },
    //Track the assignment submission status.
    status: {
        type: String,
        enum: ["pending", "submitted"],
        default: "pending"
    }


}, { timestamps: true })

//Create the StudentAssignmet model.
const StudentAssignmet = mongoos.model("StudentAssignmet", studentAssignmentschema)

module.exports = StudentAssignmet