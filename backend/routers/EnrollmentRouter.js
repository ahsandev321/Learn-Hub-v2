const express = require("express")

//Create a enrollment router.
const enrollmentRouter = express.Router()

//Import enrollment controller functions.
const { enrollmentFreeCourse, getMyCourses, getMyStudents, deleteStudentsFromCourse } = require('../controller/EnrollmentController')

//Enroll a student in a free course.
enrollmentRouter.post("/enroll-free", enrollmentFreeCourse)

//Get courses enrolled in by the student.
enrollmentRouter.get("/my-courses", getMyCourses)

//Get students enrolled in the instructor's courses.
enrollmentRouter.get("/my-students", getMyStudents)

//Remove a student in specific course.
enrollmentRouter.delete("/remove-students/:studentId/:courseId", deleteStudentsFromCourse)

module.exports = enrollmentRouter