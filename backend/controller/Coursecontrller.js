const Course = require("../model/CoursesModel")
const Assignment = require("../model/AssignmentModel")
const Video = require("../model/VideoModel")
const Enrollment = require("../model/EnrollmentModel")
const ContentView = require("../model/ContentViewModel")
const StudentAssignmet = require("../model/StudentAssignmetModel")

const { getSocketIo } = require("../Socket")

const { uploadfiles, deletefile } = require('../config/Cloudinary')


//Create a new courese and upload its thumbnail.
const addCourses = async (req, res) => {

   try {

      const courseImage = await uploadfiles(req.file.path)

      if (!courseImage) {
         return (
            console.log("course image is not required")
         )
      }

      //Save coure details in the database.
      const courses = await Course.create({
         title: req.body.title,
         description: req.body.description,
         instructor: req.body.userId,
         category: req.body.category,
         price: req.body.price,
         thumbnail: courseImage.secure_url,
         thumbnailPublicId: courseImage.public_id
      })

      res.send({
         succcess: true,
         message: "Courses add successfully",
         courses: courses
      })

   } catch (error) {

      res.status(500).json(error.message)


   }
}

//Update the course details and replace the thumbnail if provided.
const updateCourses = async (req, res) => {

   try {

      const courses = await Course.findById(req.params.id)

      if (!courses) {
         return (
            console.log("course id not find")
         )
      }

      if (req.file) {

         //Upload the new thumbnail and delete the old one.
         const updateimage = await uploadfiles(req.file.path)

         const result = await deletefile(courses.thumbnailPublicId, "image")

         if (!result || result.result !== "ok") {
            throw new Error("Thumbnail deletion failed")
         }

         courses.thumbnail = updateimage.secure_url
         courses.thumbnailPublicId = updateimage.public_id
      }

      //Update course details.
      courses.title = req.body.title
      courses.description = req.body.description
      courses.category = req.body.category
      courses.price = req.body.price

      await courses.save()
      res.send({
         succcess: true,
         message: "Courese update successfully"
      })


   } catch (error) {

      res.status(500).json(error.message)


   }


}

//Delete a course and its related data.
const deleteCourses = async (req, res) => {

   try {

      const courses = await Course.findById(req.params.id)

      if (!courses) {
         return (
            console.log("course id not find")
         )
      }

      //Delete the course thumbnail from cloudinary.
      const result = await deletefile(courses.thumbnailPublicId, "image")

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

      //Delete student assignment
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


       //Delete the course content view record from the database.
      await ContentView.deleteMany({
         course: req.params.id

      })

      //Delete the course record from the database.
      await Course.findByIdAndDelete(req.params.id)

      //Notify the student through Socket.IO.
      const studentio = getSocketIo()

      for (let i = 0; i < enrollment.length; i++) {

         studentio.to(`student-${enrollment[i].student}`).emit("courseDeleted")
      }



      res.send({
         succcess: true,
         message: "Courese data delete successfully"
      })

   } catch (error) {

      res.status(500).json(error.message)


   }


}

//Get all courses created by specific instructor.
const getMyCourses = async (req, res) => {

   try {

      const course = await Course.find({
         instructor: req.query.userId
      })

      res.send(course)

   } catch (error) {

      res.status(500).json(error.message)


   }


}

//Get all available courses.
const getCourses = async (req, res) => {

   try {

      const course = await Course.find()

      res.send(course)

   } catch (error) {

      res.status(500).json(error.message)


   }


}


module.exports = {
   addCourses,
   updateCourses,
   getMyCourses,
   getCourses,
   deleteCourses

}