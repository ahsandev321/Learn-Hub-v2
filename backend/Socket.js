const { get } = require("mongoose")

//Store the Socket.IO instance.
let io = null

//set the Socket.IO instance for use across module.
const setSocketIo = (socketIo) => {
    io = socketIo
}

//Return the stored Socket.IO instance.
const getSocketIo = () => {
    return io
}

//Export the Socket.IO helper functions.
module.exports = {
    setSocketIo,
    getSocketIo
}