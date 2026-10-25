const mongoose =require("mongoose");

//Define the course schema.
const coursesSchema = mongoose.Schema({
      
    //Store the course title.
    title:{
        type: String,
        required:true,
        trim: true
    },
    //Store the course discription.
    description:{
        type:String,
        required: true,
        trim: true
    },
    //Reference the instructor who owns the course.
    instructor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    //Store the course category.
    category:{
       type: String,
       required: true,
       trim: true

    },
    //Set the course price; negative values are not allowed.
    price:{
        type: Number,
        required: true,
        min: 0
    },
    //Store the course thumbnail URL.
   thumbnail: {
        type:String,
        require:true
    },
    //Store the thumbnail's cloudinary public ID.
    thumbnailPublicId:{
          type:String,
        require:true
    }


}, {timestamps: true})

//Create the course model.
const Course = mongoose.model("Course", coursesSchema);

module.exports = Course;