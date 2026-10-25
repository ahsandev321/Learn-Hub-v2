const mongoose = require("mongoose")

//Define the schema for contact messages.
const contactUsSchema = mongoose.Schema({

    //Store the Id the user who sent the mesage.
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    //Store the sender's name.
    name: {
        type: String,
        required: true
    },

    //Store the sender's email address.
    email: {
        type: String,
        required: true
    },

    //Store the contact messgae.
    message: {
        type: String,
        required: true
    },

    //Track whether the admin has the message.
    isRead:{
        type: Boolean,
        default: false
    }


}, { timestamps: true })

//Create the ContactUs model.
const ContactUs = mongoose.model("ContactUs", contactUsSchema)

module.exports = ContactUs