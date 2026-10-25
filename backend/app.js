

//Load enviroment variables.
require("dotenv").config();

const http = require("http")

const { Server } = require("socket.io")

//Import the Socket.IO configuration helper.
const { setSocketIo } = require("./Socket")

const express = require("express");

const app = express();

const cors = require("cors");

//Imoprt database connection finction.
const dbConnection = require("./db/indux")

//Import application routers.
const signuprouter = require("./routers/SignupRouter")

const courserouter = require("./routers/Coursesrouter")

const videorouter = require('./routers/Videorouter')

const assignmentRouter = require("./routers/AssignmentRouter")

const enrollmentRouter = require("./routers/EnrollmentRouter")

const studentAssignmentRouter = require("./routers/StudentAssignmetrouter")

const contentViewRouter = require("./routers/ContentViewrouter")

const adminRouter = require("./routers/AdminRouter")

const settingrouter = require("./routers/SettingRouter")

const contactUSRouter = require("./routers/ContactUsrouter")

const frontendURL = "https://learn-hub-project-v2.netlify.app"

//Create HTTP server for express.
const server = http.createServer(app)

//initialize Socket.IO with CORS settings.
const io = new Server(server, {
    cors: {
        origin: frontendURL
    }
})

setSocketIo(io)

app.use(express.json())


app.use(cors({ origin: frontendURL }))

//Register application routers.
app.use('/', signuprouter);

app.use('/', courserouter);

app.use('/', videorouter);

app.use('/', assignmentRouter);

app.use('/', enrollmentRouter)

app.use('/', studentAssignmentRouter);

app.use('/', contentViewRouter)

app.use('/', adminRouter)

app.use('/', settingrouter)

app.use('/', contactUSRouter)

//Handle new Socket.IO connections.
io.on("connection", (socket) => {

    socket.on("joinStudentRoom", (studentId) => {
        socket.join(`student-${studentId}`)
    })

    socket.on("joinCourseRoom", (courseId) => {
        socket.join(`course-${courseId}`)
    })

})

const PORT = process.env.PORT || 5000

//Start the server on the configured port.
const startServer = async () => {
    try {

        //Connect to the database.
        await dbConnection()

        server.listen(PORT, "0.0.0.0", () => {
            console.log("server start")
        })
    }catch(error){
        console.log("Failed to start server :", error)

        throw error
    }
}

 startServer()
