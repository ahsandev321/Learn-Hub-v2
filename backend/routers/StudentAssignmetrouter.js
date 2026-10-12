const express = require("express")

//Create the student assignment router.
const studentAssignmentRouter = express.Router()

//Configure file upload middleware.
const upload = require("../middleware/multer")

//Import student assignment controller functions.
const { submitAssignment, getAssignment, deleteAssignment, getUnReadAssignment, readAssignments } = require("../controller/StudentAssignmentController")

//Submit an assignmnet with its file.
studentAssignmentRouter.post("/submit-assignment", upload.single("assignment"), submitAssignment)

//Get assignments submitted by a student.
studentAssignmentRouter.get("/submit-assignment", getAssignment)

//Get unread assignment submission.
studentAssignmentRouter.get("/unread-assignments", getUnReadAssignment)

//Mark a student's assignments as read.
studentAssignmentRouter.put("/read-assignments/:studentId", readAssignments)

//Delete student assignments for a specific course.
studentAssignmentRouter.delete("/delete-assignments/:studentId/:courseId", deleteAssignment)

module.exports = studentAssignmentRouter