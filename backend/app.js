const dns =require("dns")

//Configure custom DNS servers.
dns.setServers([
     "8.8.8.8",
    "8.8.4.4"
])

//Load enviroment variables.
require("dotenv").config();

const http =require("http")

const {Server} =require("socket.io")

//Import the Socket.IO configuration helper.
const {setSocketIo}=require("./Socket")

const express =require("express");

const app =express();

const cors =require("cors");

//Imoprt database connection finction.
const dbConnection =require("./db/indux")

//Import application routers.
const signuprouter =require("./routers/SignupRouter")

const courserouter =require("./routers/Coursesrouter")

const videorouter =require('./routers/Videorouter')

const assignmentRouter =require("./routers/AssignmentRouter")

const enrollmentRouter =require("./routers/EnrollmentRouter")

const studentAssignmentRouter =require("./routers/StudentAssignmetrouter")

const contentViewRouter =require("./routers/ContentViewrouter")

//Create HTTP server for express.
const server = http.createServer(app)

//initialize Socket.IO with CORS settings.
const io = new Server(server, {
    cors: {
        origin: '*'
    }
})

setSocketIo(io)

app.use(express.json())

//Connect to the database.
dbConnection()

app.use(cors())

//Register application routers.
app.use('/', signuprouter );

app.use('/', courserouter);

app.use('/', videorouter);

app.use('/', assignmentRouter);

app.use('/', enrollmentRouter)

app.use('/', studentAssignmentRouter);

app.use('/', contentViewRouter)

//Handle new Socket.IO connections.
io.on("connection", (socket)=>{

    socket.on("joinStudentRoom", (studentId)=>{
        socket.join(`student-${studentId}`)
    })

})

//Start the server on the configured port.
server.listen(process.env.PORT,()=>{
    console.log("server start")
}) 
