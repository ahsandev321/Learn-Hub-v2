const express = require("express")

//Create a enrollment router.
const enrollmentRouter = express.Router()

//Import enrollment controller functions.
const { enrollmentFreeCourse, getMyCourses, getMyStudents, deleteStudentsFromCourse } = require('../controller/EnrollmentController')

//Import middleware to verify the user's JWT token. 
const authMiddleware =require("../middleware/authMiddleware")

//Import the middleware to check the user role and permissions.
const roleMiddleware =require("../middleware/roleMiddleware")

//Enroll a student in a free course.
enrollmentRouter.post("/enroll-free", authMiddleware, roleMiddleware("student"), enrollmentFreeCourse)

//Get courses enrolled in by the student.
enrollmentRouter.get("/student-courses", authMiddleware, roleMiddleware("student"), getMyCourses)

//Get students enrolled in the instructor's courses.
enrollmentRouter.get("/my-students", authMiddleware, roleMiddleware("instructor"), getMyStudents)

//Remove a student in specific course.
enrollmentRouter.delete("/remove-students/:studentId/:courseId", authMiddleware, roleMiddleware("instructor"), deleteStudentsFromCourse)

module.exports = enrollmentRouter