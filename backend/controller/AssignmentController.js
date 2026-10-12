const Assignment = require("../model/AssignmentModel")

const { uploadfiles, deletefile } = require('../config/Cloudinary')

//Upload a new assignment and save its details.
const uploadAssignment = async (req, res) => {

    try {

        const assignmentFile = await uploadfiles(req.file.path)

        if (!assignmentFile) {
            console.log("Assignment upload failed")
        }

        // Save assignment details in the database.
        await Assignment.create({
            title: req.body.title,
            fileUrl: assignmentFile.secure_url,
            filePublicId: assignmentFile.public_id,
            course: req.body.courseId,
            instructor: req.body.instructorId
        })

        res.send({
            success: true,
            message: "Assignment upload successfullly"
        })



    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
}

//Update assignment details and replace the file if provided.
const updateAssignment = async (req, res) => {

    try {

        const assignment = await Assignment.findById(req.params.id)

        if (!assignment) {
            console.log("Assignmet not found")
        }

        if (req.file) {

            //Upload the new file and remove the old one. 
            const editAssignment = await uploadfiles(req.file.path)

            await deletefile(assignment.filePublicId, "raw")

            assignment.fileUrl = editAssignment.secure_url
            assignment.filePublicId = editAssignment.public_id
        }

        //Update assignment details.
        assignment.title = req.body.title
        assignment.course = req.body.courseId
        assignment.instructor = req.body.instructorId

        await assignment.save()

        res.send({
            success: true,
            message: "Assignment update successfully"
        })


    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
}

//Get assignments for specific course.
const getAssignment = async (req, res) => {

    try {

        const courseId = req.query.courseId

        const assignment = await Assignment.find({
            course: courseId,
        })

        res.send({
            success: true,
            data: assignment
        })


    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
}


//Delete an assignment and its uploaded file.
const deleteAssignment = async (req, res) => {

    try {

        const assignment = await Assignment.findById(req.params.id)

        if (!assignment) {
            console.log("Assignmet not found")
        }

        //Remove the file from cloudinary.
        await deletefile(assignment.filePublicId, "raw")

        //Delete the assignment record from database.
        await Assignment.findByIdAndDelete(req.params.id)


        res.send({
            success: true,
            message: "Assignment delete successfully"
        })


    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
}


module.exports = {
    uploadAssignment,
    updateAssignment,
    getAssignment,
    deleteAssignment
}