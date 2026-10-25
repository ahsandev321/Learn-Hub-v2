const User = require("../model/SignuserModel")
const Course = require("../model/CoursesModel")
const Assignment = require("../model/AssignmentModel")
const ContentView = require("../model/ContentViewModel")
const Enrollment = require("../model/EnrollmentModel")
const StudentAssignmet = require("../model/StudentAssignmetModel")
const Video = require("../model/VideoModel")

const { getSocketIo } = require("../Socket")

const { deletefile } = require("../config/Cloudinary")

const getAdmindetails = async (req, res) => {

    try {

        //Get the totel number of user and couses.
        const totlelUser = await User.countDocuments()
        const totlelCourses = await Course.countDocuments()

        //Count student and instructors separately.
        const totelInstructors = await User.countDocuments({
            role: "instructor"
        })
        const totelStudents = await User.countDocuments({
            role: "student"
        })

        //Prepear the dashboard data for the frontend.
        const details = {
            totlelUser,
            totlelCourses,
            totelInstructors,
            totelStudents
        }

        res.send({
            success: true,
            details: details
        })

    }
    catch (error) {
        console.log(error)
        res.status(500).json(error.message)

    }

}

const getAllUsers = async (req, res) => {
    try {

        //Get all student without their passwords.
        const allstudent = await User.find({
            role: "student"
        }).select("-password")

        //Get all instructor without their passwords.
        const allteacher = await User.find({
            role: "instructor"
        }).select("-password")

        //Send both students and instructors in the respnse.
        res.send({
            success: true,
            allstudent: allstudent,
            allteacher: allteacher
        })

    }
    catch (error) {
        console.log(error)
        res.status(500).json(error.message)

    }

}

const getInstructorData = async (req, res) => {

    try {

        const instructorId = req.params.id

        //Find the instructor by Id and role.
        const instructor = await User.findOne({
            _id: instructorId,
            role: "instructor"
        })

        if (!instructor) {
            return res.status(404).json({
                success: false,
                message: "Instructor not found"
            })
        }

        //Get the courses by instructor Id.
        const courses = await Course.find({
            instructor: instructorId
        })


        const data = {
            courses,

        }

        res.send({
            success: true,
            data: data
        })



    }
    catch (error) {
        console.log(error)
        res.status(500).json(error.message)

    }


}

const getCoursesData = async (req, res) => {

    try {

        const courseId = req.params.id

        if (!courseId) {
            return res.status(404).json({
                success: false,
                message: "Instructor not found"
            })
        }


        //Get all videos and assignments for this course.
        const videos = await Video.find({
            course: courseId
        })

        const assignments = await Assignment.find({
            course: courseId
        })


        const data = {
            videos,
            assignments,
        }

        //Send response to the frontend.
        res.send({
            success: true,
            data: data
        })



    }
    catch (error) {
        console.log(error)
        res.status(500).json(error.message)

    }


}

const deleteInstructor = async (req, res) => {

    try {


        const instructorId = req.params.instructorId

        const instructor = await User.findOne({
            _id: instructorId,
            role: "instructor"
        })

        if (!instructor) {
            return res.status(404).json({
                success: false,
                message: "Instructor not found"
            })
        }

        //Get all courses created by the instructor.
        const courses = await Course.find({
            instructor: instructorId
        })

        const courseIds = []

        for (let i = 0; i < courses.length; i++) {

            courseIds.push(courses[i]._id);
        }

        //Get all videos and assignments linked to these courses.
        const videos = await Video.find({
            course: courseIds
        })

        const assignments = await Assignment.find({
            course: courseIds
        })



        const assignmentIds = []

        for (let i = 0; i < assignments.length; i++) {

            assignmentIds.push(assignments[i]._id)
        }

        //Find all student submissions for these assignment
        const studentSubmission = await StudentAssignmet.find({
            assignment: assignmentIds
        })

        //Delete uploades files form cloudinary.
        for (let i = 0; i < videos.length; i++) {

            const result = await deletefile(videos[i].videoPublicId, "video")

            if (!result || result.result !== "ok") {
                throw new Error("Video deletion failed")
            }

        }
        for (let i = 0; i < assignments.length; i++) {

            const result = await deletefile(assignments[i].filePublicId, "raw")

            if (!result || result.result !== "ok") {
                throw new Error("Assignment deletion failed")
            }

        }
        for (let i = 0; i < courses.length; i++) {

            const result = await deletefile(courses[i].thumbnailPublicId, "image")

            if (!result || result.result !== "ok") {
                throw new Error("courses deletion failed")
            }

        }
        for (let i = 0; i < studentSubmission.length; i++) {

            const result = await deletefile(studentSubmission[i].filePublicId, "raw")

            if (!result || result.result !== "ok") {
                throw new Error("studentSubmission deletion failed")
            }
        }

        //Remove related records from the database.
        await StudentAssignmet.deleteMany({
            assignment: assignmentIds

        })

        await ContentView.deleteMany({
            course: courseIds

        })


        await Enrollment.deleteMany({
            courses: courseIds

        })


        await Video.deleteMany({
            course: courseIds

        })


        await Assignment.deleteMany({
            course: courseIds

        })

        await Course.deleteMany({
            instructor: instructorId

        })

        await User.findByIdAndDelete(instructorId)

        //Notify connected users that the instructor's courses were deleted.
        const io = getSocketIo()

        for (let i = 0; i < courses.length; i++) {

            io.to(`course-${courses[i]._id}`).emit("courseDeleted")
        }




        res.send({
            success: true,
            message: "Instructor and related data delete successfully"
        })

    }
    catch (error) {
        console.log(error)
        res.status(500).json(error.message)

    }



}

const deleteInstructorCourse = async (req, res) => {
    try {

        const coursesId = await Course.findById(req.params.id)

        if (!coursesId) {
            return (
                console.log("course id not find")
            )
        }

        //Delete the course thumbnail from cloudinary.
        const result = await deletefile(coursesId.thumbnailPublicId, "image")

        if (!result || result.result !== "ok") {
            throw new Error("Thumbnail deletion failed")
        }

        //Delete course videos and their uploaded files.
        const video = await Video.find({
            course: req.params.id
        })

        for (let i = 0; i < video.length; i++) {

            const result = await deletefile(video[i].videoPublicId, "video")


            if (!result || result.result !== "ok") {
                throw new Error("video deletion failed")
            }


            await Video.findByIdAndDelete(video[i]._id)

        }

        //Delete course assignments and their uploaded files.
        const assignment = await Assignment.find({
            course: req.params.id
        })

        for (let i = 0; i < assignment.length; i++) {

            const result = await deletefile(assignment[i].filePublicId, "raw")

            if (!result || result.result !== "ok") {
                throw new Error("Assignment deletion failed")
            }

            await Assignment.findByIdAndDelete(assignment[i]._id)

        }


        const studentAssignment = []

        for (let i = 0; i < assignment.length; i++) {

            const submission = await StudentAssignmet.find({
                assignment: assignment[i]._id
            })

            studentAssignment.push(...submission)
        }

        for (let i = 0; i < studentAssignment.length; i++) {

            const result = await deletefile(studentAssignment[i].filePublicId, "raw")

            if (!result || result.result !== "ok") {
                throw new Error("Student assignment deletion failed")
            }

            await StudentAssignmet.findByIdAndDelete(studentAssignment[i]._id)

        }


        //Delete all enrollments linked to the course.
        const enrollment = await Enrollment.find({
            courses: req.params.id
        })

        for (let i = 0; i < enrollment.length; i++) {
            await Enrollment.findByIdAndDelete(enrollment[i]._id)
        }

        await ContentView.deleteMany({
            course: req.params.id

        })

        //Delete the course record from the database.
        await Course.findByIdAndDelete(req.params.id)

        const coursesio = getSocketIo();

        coursesio.to(`course-${coursesId._id}`).emit("courseDeleted")

        //Notify the student through Socket.IO.
        const studentio = getSocketIo()

        for (let i = 0; i < enrollment.length; i++) {

            studentio.to(`student-${enrollment[i].student}`).emit("courseDeleted")
        }

        res.send({
            succcess: true,
            message: "Courese data delete successfully"
        })


    }
    catch (error) {
        console.log(error)
        res.status(500).json(error.message)

    }

}
const deleteCourseVideo = async (req, res) => {
    try {

        const video = await Video.findById(req.params.id)


        if (!video) {
            return res.status(404).json({
                success: false,
                message: "videoId not found"
            })
        }

        //Delete the video file form cloudinary.
        const result = await deletefile(video.videoPublicId, "video")

        if (!result || result.result !== "ok") {
            throw new Error("Video deletion failed")
        }

        //Delete video from database.
        await Video.findByIdAndDelete(req.params.id)

        const io = getSocketIo()

        //Notify connected users about the video deleteion.
        io.to(`course-${video.course}`).emit("courseDeleted")



        res.send({
            success: true,
            message: "Video delete successfully"
        })




    }
    catch (error) {
        console.log(error)
        res.status(500).json(error.message)

    }

}

const deleteCourseAssignment = async (req, res) => {
    try {

        const assignment = await Assignment.findById(req.params.id)


        if (!assignment) {
            return res.status(404).json({
                success: false,
                message: "AssignmentId not found"
            })
        }

        //Delete the assignment file from cloudinary.
        const result = await deletefile(assignment.filePublicId, "raw")

        if (!result || result.result !== "ok") {
            throw new Error("Assignment deletion failed")
        }

        //Delete assignment from database.
        await Assignment.findByIdAndDelete(req.params.id)

        //Notify connected users about the assignment deleteion.
        const io = getSocketIo()

        io.to(`course-${assignment.course}`).emit("courseDeleted")



        res.send({
            success: true,
            message: "Assignment delete successfully"
        })




    }
    catch (error) {
        console.log(error)
        res.status(500).json(error.message)

    }

}

const deleteStudent = async (req, res) => {
    try {


        const studentId = req.params.studentId

        const student = await User.findOne({
            _id: studentId,
            role: "student"
        })

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            })
        }

        //get all assignments submitted by the student.
        const studentSubmission = await StudentAssignmet.find({
            student: studentId
        })

        //Delete submitted files from cloudinary.
        for (let i = 0; i < studentSubmission.length; i++) {

            const result = await deletefile(studentSubmission[i].filePublicId, "raw")

            if (!result || result.result !== "ok") {
                throw new Error("StudentAssignmet deletion failed")
            }
        }

        //Delete the student's related data from the database.
        await StudentAssignmet.deleteMany({
            student: studentId

        })

        await ContentView.deleteMany({
            student: studentId

        })


        await Enrollment.deleteMany({
            student: studentId

        })

        await User.findByIdAndDelete(studentId)

        //Notify the student that therir account has been deleted
        const io = getSocketIo()

        io.to(`student-${studentId}`).emit("studentAccountDeleted")


        res.send({
            success: true,
            message: "Student and related data delete successfully"
        })


    }
    catch (error) {
        console.log(error)
        res.status(500).json(error.message)

    }

}




module.exports = {
    getAdmindetails,
    getAllUsers,
    getInstructorData,
    getCoursesData,
    deleteInstructor,
    deleteStudent,
    deleteInstructorCourse,
    deleteCourseVideo,
    deleteCourseAssignment


}