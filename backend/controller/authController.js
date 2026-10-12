const User = require("../model/SignuserModel")

//Register a new user.
const signupUser = async (req, res) => {

    try {

        //Check if the email is already registered.
        const signupUserData = await User.findOne({
            email: req.body.email
        })

        if (signupUserData) {
            return (
                res.send({
                    existEmail: true,
                    existEmailMessage: "Email already exist"
                })
            )
        }

        //Save the new user's details in the database.
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword,
            role: req.body.userRole
        })

        res.send({
            submitData: true,
            submitDataMessage: "Data submit successfully"
        })


        console.log("Data submit successfylly")

    } catch (error) {
        res.status(500).json(error.message)
    }
}

//Authenticate a new user with email and password.
const loginUser = async (req, res) => {

    try {

        //Find the user by email.
        const user = await User.findOne({
            email: req.body.email
        })

        if (!user) {
            return (
                res.send({
                    emailNotMatch: true,
                    emailMessage: "Email not match"
                })
            )
        }

        //Verify the submitted password.
        if (user.password !== req.body.password) {
            return (
                res.send({
                    passwordNotMatch: true,
                    passwordMessage: "Password not match"
                })
            )
        }

        //Return the user's role and ID after successful login.
        res.send({
            dataMatch: true,
            loginMessage: "user login successfully",
            role: user.role,
            userId: user.id
        })

    } catch (error) {
        res.status(500).json(error.message)
    }
}

module.exports = {
    signupUser,
    loginUser
}