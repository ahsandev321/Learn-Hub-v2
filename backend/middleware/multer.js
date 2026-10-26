const multer = require('multer')

//Configer local file storage.
// const storage = multer.diskStorage({

// //     //Set the upload directory.
// //     destination: function (req, file, cb) {
// //         cb(null, "upload/")
// //     },
// //     //Generate a unique filename for each upload.
// //     filename: function (req, file, cb) {
// //         cb(null, Date.now() + "-" + file.originalname)
// //     }
// })
const storage = multer.memoryStorage()

//Initialization Multer with the storage configuration.
const upload = multer({
    storage,
    limits:{
        fieldNameSize : 100 * 1024 * 1024
    }
})

module.exports = upload