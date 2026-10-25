const express = require("express")

//Create assignment router.
const assignmentRouter = express.Router()

//Configure upload file upload middleware.
const upload = require("../middleware/multer")

//Import middleware to verify the user's JWT token. 
const authMiddleware =require("../middleware/authMiddleware")

//Import the middleware to check the user role and permissions.
const roleMiddleware =require("../middleware/roleMiddleware")

//Import assignment controller functions.
const { uploadAssignment, getAssignment, deleteAssignment, updateAssignment } = require("../controller/AssignmentController")

//Upload a new assignment with its file.
assignmentRouter.post("/assignments", authMiddleware, roleMiddleware("instructor"), upload.single("assignment"), uploadAssignment)

//Update an assignment and optionally replace its file.
assignmentRouter.put("/assignments/:id", authMiddleware, roleMiddleware("instructor"), upload.single("assignment"), updateAssignment)

//Get the list of assignmnets.
assignmentRouter.get("/assignments", authMiddleware, getAssignment)

//Delete an assignment by ID.
assignmentRouter.delete("/assignments/:id", authMiddleware, roleMiddleware("instructor"), deleteAssignment)

module.exports = assignmentRouter