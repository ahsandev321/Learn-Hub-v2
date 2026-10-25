const express = require("express")

const cors = require("cors")

const serverless =require("serverless-http")

const dbConnection =require('../../db/indux')

//Import application routers.
const signuprouter =require("../../routers/SignupRouter")

const courserouter =require("../../routers/Coursesrouter")

const videorouter =require('../../routers/Videorouter')

const assignmentRouter =require("../../routers/AssignmentRouter")

const enrollmentRouter =require("../../routers/EnrollmentRouter")

const studentAssignmentRouter =require("../../routers/StudentAssignmetrouter")

const contentViewRouter =require("../../routers/ContentViewrouter")

const adminRouter =require("../../routers/AdminRouter")

const settingrouter =require("../../routers/SettingRouter")

const contactUSRouter =require("../../routers/ContactUsrouter")

const frontendURL = "https://learn-hub-project-v2.netlify.app"


const app = express()


app.use(async (req, res, next) => {
    try {

        //Connect to the database.
        await dbConnection()

        next()

    } catch (error) {
        console.log("Failed to connect database :", error)
        
        return res.status(500).json({
            messgae : "Database connection failed"
        })

        
    }
})


app.use(cors({
    origin : frontendURL
}))

app.use(express.json())

//Register application routers.
app.use('/', signuprouter );

app.use('/', courserouter);

app.use('/', videorouter);

app.use('/', assignmentRouter);

app.use('/', enrollmentRouter)

app.use('/', studentAssignmentRouter);

app.use('/', contentViewRouter)

app.use('/', adminRouter)

app.use('/', settingrouter)

app.use('/', contactUSRouter)




module.exports.handler = serverless(app)