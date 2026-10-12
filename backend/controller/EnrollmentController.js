const Enrollment = require("../model/EnrollmentModel")
const Course = require('../model/CoursesModel')
const { getSocketIo } = require("../Socket")

//Enroll a student in a free course.
const enrollmentFreeCourse = async (req, res) => {


    try {

        const studentId = req.body.studentId
        const courseId = req.body.courseId


        const course = await Course.findById(courseId)

        if (!course) {

            return (
                console.log("course not found")

            )

        }

        //Allow enrollment only in free courses.
        if (course.price !== 0) {

            return (
                console.log("This course is not free")
            )

        }

        //Check if the student is already enrolled.
        const alreadyEnrolled = await Enrollment.findOne({
            student: studentId,
            courses: courseId
        })

        if (alreadyEnrolled) {

            return (
                res.send({
                    Enrolled: true,
                    message: "You already enrolled in this course"
                })
            )

        }

        //Save enrollment record.
        const enrollment = await Enrollment.create({
            student: studentId,
            courses: courseId,
            price: course.price
        })

        res.send({
            success: true,
            message: "Course enrolled successfully",
            enrollment: enrollment

        })

    }
    catch (error) {

        res.status(500).json(error.message)


    }
}

//Get all courses enrolled by a student.
const getMyCourses = async (req, res) => {

    try {

        const studentId = req.query.studentId

        const myCourse = await Enrollment.find({
            student: studentId
        }).populate("courses")

        res.send({
            courses: myCourse
        })

    } catch (error) {
        res.status(500).json(error.message)
    }

}

//Get students enrolled in an instructor's courses.
const getMyStudents = async (req, res) => {

    try {

        const instructorId = req.query.instructorId

        const enrollments = await Enrollment.find()
            .populate("student")
            .populate("courses")

        //Filter enrollments by course instructor.
        const students = enrollments.filter(
            (data) => data.courses.instructor.toString() === instructorId
        )

        res.send({
            students: students
        })

    } catch (error) {
        res.status(500).json(error.message)
    }

}

//Remove a student from a courses and notify them in real time.
const deleteStudentsFromCourse = async (req, res) => {

    try {
        const studentId = req.params.studentId
        const courseId = req.params.courseId

        const enrollment = await Enrollment.findOneAndDelete({
            student: studentId,
            courses: courseId
        })

        if (!enrollment) {
            return res.status(404).json({
                success: false,
                message: "Student is not enrolled in thid course"
            })
        }

        //Notify the student through Socket.IO.
        const io = getSocketIo()

        io.to(`student-${studentId}`).emit("studentRemove", {
            studentId: studentId,
            courseId: courseId
        })

        res.send({
            success: true,
            message: "Student removed from course successfully"
        })

    } catch (error) {
        res.status(500).json(error.message)
    }

}



module.exports = {
    enrollmentFreeCourse,
    getMyCourses,
    getMyStudents,
    deleteStudentsFromCourse
}