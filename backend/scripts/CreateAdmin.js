const dns =require("dns")

//Configure custom DNS servers.
dns.setServers([
     "8.8.8.8",
    "8.8.4.4"
])

require("dotenv").config()

const mongoose = require("mongoose");
const bcrypt =require("bcrypt")
const User =require("../model/SignuserModel")

//Create admin account.
const createAdmin = async() => {

        try {

            //Connect to the database.
            await mongoose.connect(`${process.env.MONGO_URL}/${process.env.NAME}`)

            //Read admin details form environment variables.
            const name = process.env.ADMIN_NAME
            const email = process.env.ADMIN_EMAIL
            const password = process.env.ADMIN_PASSWORD

            //Check all required value are available.
            if( !name || !email || !password){
                throw new Error("Admin environment variables are missing")
            }

            //Check weather the admin account already exists.
            const existingAdmin = await User.findOne({
                role : "admin"
            })

            if(existingAdmin){
                console.log("An admin account already exists.")
                return
            }

            //Hash the admin password.
            const hashedPassword = await bcrypt.hash(password, 10)

            //Create admin account.
            await User.create({
                name:name,
                email:email,
                password:hashedPassword,
                role: "admin"
            })

            console.log("Admin account create successfully")

              //Close the database connection.
            await mongoose.disconnect()

        } catch (error) {

            //Log database connection errors.
            console.error("Failed to create to admin:", error.message)
            
            //Close the database connection.
             await mongoose.disconnect()

        }
}

createAdmin()

