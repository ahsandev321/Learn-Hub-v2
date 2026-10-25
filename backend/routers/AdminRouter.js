const express = require("express")

const adminRouter = express.Router()

//Import middleware to verify the user's JWT token. 
const authMiddleware = require("../middleware/authMiddleware")

//Import the middleware to check the user role and permissions.
const roleMiddleware = require("../middleware/roleMiddleware")

//Import admin controller functions.
const { getAdmindetails, getAllUsers, getInstructorData, deleteCourseAssignment, deleteCourseVideo, getCoursesData, deleteInstructor, deleteStudent, deleteInstructorCourse } = require("../controller/AdminController")

//Get admin details.
adminRouter.get("/admin-details", authMiddleware, roleMiddleware("admin"), getAdmindetails)

//Get all users.
adminRouter.get("/admin-get-users", authMiddleware, roleMiddleware("admin"), getAllUsers)

//Get instructor details by Id.
adminRouter.get("/admin-get-instructor-data/:id", authMiddleware, roleMiddleware("admin"), getInstructorData)

//Get course details by ID.
adminRouter.get("/admin-get-courses-data/:id", authMiddleware, roleMiddleware("admin"), getCoursesData)

//Delete a course assignments by ID.
adminRouter.delete("/admin-courses-assignment-data/:id", authMiddleware, roleMiddleware("admin"), deleteCourseAssignment)

//Delete a course video by ID
adminRouter.delete("/admin-courses-video-data/:id", authMiddleware, roleMiddleware("admin"), deleteCourseVideo)

//Delete an instructor by ID.
adminRouter.delete("/instructor/:instructorId", authMiddleware, roleMiddleware("admin"), deleteInstructor)

//Delete a student by Id.
adminRouter.delete("/student/:studentId", authMiddleware, roleMiddleware("admin"), deleteStudent)

//Delete a course by Id.
adminRouter.delete("/course/:id", authMiddleware, roleMiddleware("admin"), deleteInstructorCourse)

module.exports = adminRouter