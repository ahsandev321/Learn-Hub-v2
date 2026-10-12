const mongoose = require("mongoose");

//Define the user schema.
const userSchema = mongoose.Schema({

    //Store the user's name.
    name: {
        type: String,
        required: true,
        trim: true
    },

    //Store a unique email address in lowercase.
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    //Store the user's password
    password: {
        type: String,
        required: true
    },
    //Store the password confirmation.
    confirmPassword: {
        type: String,
        required: true
    },
    //Define the user's role and default access level.
    role: {
        type: String,
        enum: ["student", "instructor"],
        default: "student"
    }


}, { timestamps: true })

//Create The User model.
const User = mongoose.model("User", userSchema);

module.exports = User;