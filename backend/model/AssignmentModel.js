const moongose =require("mongoose")

//Define the assignment schema.
const assignmetSchema = moongose.Schema({

    //Store the assignment title.
    title:{
        type: String,
        required: true
    }, 

    //Store the uploaded assignment file URL.
    fileUrl:{
        type: String,
        required: true
    },
    //Store the cloudinary public ID for file management.
     filePublicId:{
        type: String,
        required: true
    },
    //Reference the course associated with the assignment.
     course:{
        type: moongose.Schema.Types.ObjectId,
        ref: "Course",
        required: true
    }, 
    //Reference the instructor who create the assignment.
    instructor:{
        type: moongose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

},{timestamps:true})

//Create the Assignment model.
const Assignment = moongose.model("Assignment", assignmetSchema)

module.exports = Assignment 