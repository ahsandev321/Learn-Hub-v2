const express = require('express')

//Create the course router.
const courserouter = express.Router()

//Import course controller functions.
const { addCourses, getMyCourses, getCourses, updateCourses, deleteCourses } = require('../controller/Coursecontrller')

//Import middleware to verify the user's JWT token. 
const authMiddleware =require("../middleware/authMiddleware")

//Import the middleware to check the user role and permissions.
const roleMiddleware =require("../middleware/roleMiddleware")

//Configure file upload middleware.
const upload = require('../middleware/multer')

//Create new course with its thumbnail.
courserouter.post('/courses', authMiddleware, roleMiddleware("instructor"), upload.single("courseImage"), addCourses)

//Update a course and optionally replace its thumbnail.
courserouter.put('/courses/:id', authMiddleware, roleMiddleware("instructor"), upload.single("courseImage"), updateCourses)

//Get all available course.
courserouter.get('/courses', getCourses)

//Get courses belonging to the current instructor.
courserouter.get('/my-courses', authMiddleware, roleMiddleware("instructor"), getMyCourses)

//Delete a course by ID.
courserouter.delete('/courses/:id', authMiddleware, roleMiddleware("instructor"), deleteCourses)

module.exports = courserouter