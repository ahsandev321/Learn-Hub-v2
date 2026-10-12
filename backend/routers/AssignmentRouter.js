const express = require("express")

//Create assignment router.
const assignmentRouter = express.Router()

//Configure upload file upload middleware.
const upload = require("../middleware/multer")

//Import assignment controller functions.
const { uploadAssignment, getAssignment, deleteAssignment, updateAssignment } = require("../controller/AssignmentController")

//Upload a new assignment with its file.
assignmentRouter.post("/assignments", upload.single("assignment"), uploadAssignment)

//Update an assignmnet and optionally replace its file.
assignmentRouter.put("/assignments/:id", upload.single("assignment"), updateAssignment)

//Get the list of assignmnets.
assignmentRouter.get("/assignments", getAssignment)

//Delete an assignment by ID.
assignmentRouter.delete("/assignments/:id", deleteAssignment)

module.exports = assignmentRouter