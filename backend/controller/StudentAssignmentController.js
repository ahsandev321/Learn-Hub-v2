const StudentAssignmet = require("../model/StudentAssignmetModel")

const { uploadfiles, deletefile } = require('../config/Cloudinary')

//Submit and assignment with the uploaded file.
const submitAssignment = async (req, res) => {

    try {

        const studentId = req.body.studentId
        const assignmetId = req.body.assignmentId
        const description = req.body.description

        //Check if the assignment has already been submitted.
        const alreadyAssignmetSubmit = await StudentAssignmet.findOne({
            student: studentId,
            assignment: assignmetId,
        })

        if (alreadyAssignmetSubmit) {

            return res.status(400).json({
                success: false,
                message: "Assignment already submitted"
            })
        }

        //Ensure a file is selected before submission.
        if (!req.file) {

            return res.status(400).json({
                success: false,
                message: "Please select a file"
            })
        }

        const assignmentFile = await uploadfiles(req.file.path)

        //Save the submitted assignment details.
        const assignment = await StudentAssignmet.create({
            student: studentId,
            assignment: assignmetId,
            description: description,
            fileUrl: assignmentFile.secure_url,
            filePublicId: assignmentFile.public_id,
            status: "submitted"

        })

        res.send({
            success: true,
            message: "Assignmet submit successfully",
            assignment: assignment

        })



    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
}

//Get all assignment submitted by a student.
const getAssignment = async (req, res) => {

    try {

        const studentId = req.query.studentId

        const assignments = await StudentAssignmet.find({
            student: studentId
        }).populate("student")
            .populate("assignment")

        res.send({
            success: true,
            assignments: assignments
        })


    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
}

//Get unread assignment submissions for an instructor.
const getUnReadAssignment = async (req, res) => {

    try {

        const instructorId = req.query.instructorId

        const assignments = await StudentAssignmet.find({
            isRead: false
        })
            .populate("student", "id_name")
            .populate({
                path: "assignment",
                populate: {
                    path: "course"
                }
            })


        //Filter submission by course instructor.
        const unreadAssignments = assignments.filter((items) => items.assignment?.course?.instructor?.toString() === instructorId)

        res.send({
            success: true,
            unreadAssignments: unreadAssignments
        })


    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
}

//Make all unread assignments for a student as read.
const readAssignments = async (req, res) => {

    try {

        const studentId = req.params.studentId

        await StudentAssignmet.updateMany({
            student: studentId,
            isRead: false,
        }, {
            $set: { isRead: true }
        })



        res.send({
            success: true,
            message: "Assignments Mark as read"
        })


    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
}

//Delete a student's assignments for specific course.
const deleteAssignment = async (req, res) => {

    try {
        const studentId = req.params.studentId
        const courseId = req.params.courseId


        const assignments = await StudentAssignmet.find({
            student: studentId
        }).populate("assignment")

        //Filter submissions by course ID.
        const coursesAssignments = assignments.filter(
            (data) => data.assignment?.course?.toString() === courseId
        )

        //Delete submission records and their uploaded files.
        for (let i = 0; i < coursesAssignments.length; i++) {

         const result =  await StudentAssignmet.findByIdAndDelete(coursesAssignments[i]._id)

           if (!result || result.result !== "ok") {
            throw new Error("Student assignment deletion failed")
        }


            await deletefile(coursesAssignments[i].filePublicId, "raw")

        }

        res.send({
            success: true,
            message: "Student assignments deleted successfully"
        })


    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
}



module.exports = {
    submitAssignment,
    getAssignment,
    getUnReadAssignment,
    readAssignments,
    deleteAssignment

}
