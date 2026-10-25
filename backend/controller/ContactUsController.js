const ContactUs =require("../model/ContactUsModel")

const contactUsData = async (req, res) => {

    try {

        const userId = req.body.contactUsData.userId
        const name = req.body.contactUsData.name
        const email = req.body.contactUsData.email
        const message = req.body.contactUsData.message

        //Check if all required filelds are provided.
        if(!userId || !name || !email || !message){
            return res.status(404).json({
                successs: false,
                message : "Please fill in all required fields."

            })
        }

        const data = await ContactUs.create({
            user : userId,
            name : name,
            email : email,
            message : message
        })

        res.send({
            success: true,
            data : data,
            message: "Submit Successfully"
        })


      

    }
    catch (error) {
        console.log(error)
        res.status(500).json(error.message)


    }


}

const getContactUsData = async(req, res)=>{

    try{

        //Get contact us data from database.
        const contactUsData = await ContactUs.find()

        res.send({
            success : true,
            contactUsData : contactUsData
        })


    }
    catch(error){
         console.log(error)
        res.status(500).json(error.message)

    }

}

const isReadContactUsData = async(req, res)=>{

    try{

        //Mark all unrad contact us messages as read.
        await ContactUs.updateMany(
            { isRead : false},
            {  $set : {isRead : true}}
        )

        res.send({
            success : true,
            message: "Contact Us data marked as read successfully."
        })


    }
    catch(error){
         console.log(error)
        res.status(500).json(error.message)

    }

}


const deleteContactUsData = async(req, res)=>{

    try{

        const dataId = req.params.id

        if(!dataId){
             return res.status(404).json({
                successs: false,
                message : "Contact Us data id not found."

            })

        }

        //Delete contact us data form database.
        await ContactUs.findByIdAndDelete(dataId)

     

        res.send({
            success : true,
            message : "Contact Us data delete successfully"
        })


    }
    catch(error){
         console.log(error)
        res.status(500).json(error.message)

    }

}

module.exports = {
    contactUsData,
    getContactUsData,
    deleteContactUsData,
    isReadContactUsData

}
