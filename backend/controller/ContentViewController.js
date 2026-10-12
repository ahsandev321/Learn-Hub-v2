const ContentView = require("../model/ContentViewModel")

//Mark course content as viewed by student.
const contentViewed = async (req, res) => {

    try {

        const studentId = req.body.studentId
        const contentId = req.body.contentId
        const contentType = req.body.contentType
        const courseId = req.body.courseId


        //Check if the content has already been viewed.
        const alreadyViewes = await ContentView.findOne({
            student: studentId,
            content: contentId,
            contentType: contentType
        })

        if (alreadyViewes) {
            return res.send({
                success: true,
                message: "Content already viewed"
            })
        }

        //Save the content view record.
        const contentView = await ContentView.create({
            student: studentId,
            content: contentId,
            contentType: contentType,
            course: courseId
        })

        res.send({
            success: true,
            message: "Content Marked as Viewed",
            data: contentView
        })

    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }


}

//Get all viewed content for a student.
const getContentViewed = async (req, res) => {

    try {

        const studentId = req.query.studentId

        const viewedContent = await ContentView.find({
            student: studentId
        })

        res.send({
            success: true,
            viewedContent: viewedContent
        })


    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
}

//Delete all content view records for  a student in a course.
const deleteContentViewed = async (req, res) => {

    try {

        const studentId = req.params.studentId
        const courseId = req.params.courseId


        await ContentView.deleteMany({
            student: studentId,
            course: courseId
        })


        res.send({
            success: true,
            message: "Content views delete successfully"
        })


    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
}



module.exports = {
    contentViewed,
    getContentViewed,
    deleteContentViewed
}
