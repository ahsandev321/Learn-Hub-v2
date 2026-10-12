const cloudonary = require("cloudinary").v2
const fs = require("fs")


// Configure cloudinary using environment variables.
cloudonary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


//Upload a file to cloudinary and remove the local file after processing.
const uploadfiles = async (localfilepath) => {

    try {

        if (!localfilepath) return;
        const res = await cloudonary.uploader.upload(localfilepath, {
            resource_type: "auto",
            folder: "learnHub/courses"
        })

        //Remove the local file after successful upload.
        fs.unlinkSync(localfilepath)

        return res
    } catch (error) {

        // Clean up the local file if the upload fails.
        fs.unlinkSync(localfilepath)

        return null

    }


}

//Upload a video file to cloudinary.
const uploadvideofiles = async (localfilepath) => {

    try {

        if (!localfilepath) return;
        const res = await cloudonary.uploader.upload(localfilepath, {
            resource_type: "video",
            folder: "learnHub/courses",
        })

        //Remove the local file after successful upload.
        fs.unlinkSync(localfilepath)

        return res
    } catch (error) {

        // Clean up the local file if the upload fails.
        fs.unlinkSync(localfilepath)

        return console.log(error)

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


