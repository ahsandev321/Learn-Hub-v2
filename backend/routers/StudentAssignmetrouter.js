const express = require("express")

//Create the student assignment router.
const studentAssignmentRouter = express.Router()

//Configure file upload middleware.
const upload = require("../middleware/multer")

//Import middleware to verify the user's JWT token. 
const authMiddleware =require("../middleware/authMiddleware")

//Import the middleware to check the user role and permissions.
const roleMiddleware =require("../middleware/roleMiddleware")

//Import student assignment controller functions.
const { submitAssignment, getAssignment, deleteAssignment, getUnReadAssignment, readAssignments } = require("../controller/StudentAssignmentController")


//Submit an assignmnet with its file.
studentAssignmentRouter.post("/submit-assignment", authMiddleware, roleMiddleware("student"), upload.single("assignment"), submitAssignment)

//Get assignments submitted by a student.
studentAssignmentRouter.get("/submit-assignment", authMiddleware, getAssignment)

//Get unread assignment submission.
studentAssignmentRouter.get("/unread-assignments", authMiddleware, roleMiddleware("instructor"), getUnReadAssignment)

//Mark a student's assignments as read.
studentAssignmentRouter.put("/read-assignments/:studentId", authMiddleware, roleMiddleware("instructor"), readAssignments)

//Delete student assignments for a specific course.
studentAssignmentRouter.delete("/delete-assignments/:studentId/:courseId", authMiddleware, roleMiddleware("instructor"), deleteAssignment)

module.exports = studentAssignmentRouter