const express = require('express')

//Create the course router.
const courserouter = express.Router()

//Import course controller functions.
const { addCourses, getMyCourses, getCourses, updateCourses, deleteCourses } = require('../controller/Coursecontrller')

//Configure file upload middleware.
const upload = require('../middleware/multer')

//Create new course with its thumbnail.
courserouter.post('/courses', upload.single("courseImage"), addCourses)

//Update a course and optionally replace its thumbnail.
courserouter.put('/courses/:id', upload.single("courseImage"), updateCourses)

//Get all available courese.
courserouter.get('/courses', getCourses)

//Get courses belonging to the current instructor.
courserouter.get('/courses', getMyCourses)

//Delete a course by ID.
courserouter.delete('/courses/:id', deleteCourses)

module.exports = courserouter