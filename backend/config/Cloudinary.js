const cloudonary = require("cloudinary").v2

const {Readable} = require('stream')


// Configure cloudinary using environment variables.
cloudonary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


//Upload a file to cloudinary and remove the local file after processing.
const uploadfiles = async (buffer) => {

    try {

        if (!buffer) return;

        return await new Promise((resolve, reject) => {

            const stream = cloudonary.uploader.upload_stream({
                resource_type: "auto",
                folder: "learnHub/courses"
            }, (error, result) => {
                if (error) return reject(error)
                resolve(result)

            })

            const readable = Readable.from([buffer]);

readable.on("error", reject);
stream.on("error", reject);

readable.pipe(stream);
        })

    } catch (error) {

        console.log("Upload failed :", error)

        return null

    }


}

//Upload a video file to cloudinary.
const uploadvideofiles = async (buffer) => {

    try {

        if (!buffer) return;
        return await new Promise((resolve, reject) => {

            const stream = cloudonary.uploader.upload_stream({
                resource_type: "video",
                folder: "learnHub/courses",
            }, (error, result) => {
                if (error) return reject(error)
                resolve(result)

            })

            Readable.from([buffer]).pipe(stream)
        })

    } catch (error) {

        console.log("Upload failed :", error)

        return null

    }

}

//Delete a file from cloudinary using its public ID and resource type.
const deletefile = async (publicId, resourceType) => {

    try {
        if (!publicId) return;
        const res = await cloudonary.uploader.destroy(publicId, {
            resource_type: resourceType
        })

        return res
    } catch (error) {

        //Log the error  and return null if deletion fails.
        console.log(error)
        return null
    }



}



module.exports = {
    cloudonary,
    uploadfiles,
    uploadvideofiles,
    deletefile
}


