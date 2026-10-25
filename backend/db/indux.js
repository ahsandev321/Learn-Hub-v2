const mongoose = require("mongoose");

//Connect to the MongoDB database.
const dbConnection = async() => {


        try {

            //Connect using the enviroment variables.
            const db = await mongoose.connect(`${process.env.MONGO_URL}/${process.env.NAME}`)

            //Log the connected database host.
            console.log(`Database connect || ${db.connection.host}`)

        } catch (error) {

            //Log database connection errors.
            console.log("Database connection error")
            console.log(error)

        }

    }
module.exports = dbConnection;