const User = require("../model/SignuserModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

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
        //Check if the password and confirm password match.
        if (req.body.password !== req.body.confirmPassword) {
            return res.ststus(400).json({
                message: "Passeord do not match"
            })
        }

        //Hash the password befor save it.
        const hashedPassword = await bcrypt.hash(req.body.password, 10)

        //Save the new user's details in the database.
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            role: req.body.userRole
        })

        res.send({
            submitData: true,
            submitDataMessage: "Data submit successfully"
        })


    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
}

//Authenticate a new user with email and password.
const loginUser = async (req, res) => {

    try {

        const email = req.body.email
        const password = req.body.password

        //Find the user by email.
        const user = await User.findOne({
            email: email
        })

        if (!user) {
            return (
                res.send({
                    emailNotMatch: true,
                    emailMessage: "Email not match"
                })
            )
        }

        //Compare the enter password with the Saved hashed password.
        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        )

        //Stop the login process if the password if incorrect.
        if (!passwordMatch) {
            return (
                res.send({
                    passwordNotMatch: true,
                    passwordMessage: "Password not match"
                })
            )
        }

        //Create a jwt token after successfull login.
        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        )

        //Return the user's role,ID and token after successful login.
        res.send({
            dataMatch: true,
            loginMessage: "user login successfully",
            role: user.role,
            userId: user.id,
            token: token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
}

const getUserdata = async (req, res) => {

    try {

        const user = await User.findById(req.params.userId).select("-password")

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "UserId not found"
            })
        }

        //Send the user data without the password.
        res.send({
            success: true,
            user: user
        })

    }
    catch (error) {
        console.log(error)
        res.status(500).json(error.message)


    }


}

const updateUsername = async (req, res) => {

    try {

        const userId = req.params.userId
        const name = req.body.updateName

        if (!userId) {
            return res.status(404).json({
                success: false,
                message: "UserId not found"
            })
        }

        const user = await User.findById(userId)

        user.name = name

        await user.save()

        //Send a success response after updatting the name.
        res.send({
            success: true,
            message: "Name update successfully"
        })

    }
    catch (error) {
        console.log(error)
        res.status(500).json(error.message)


    }


}

const updateUserEmail = async (req, res) => {

    try {

        const userId = req.params.userId
        const email = req.body.updateEmail

        if (!userId) {
            return res.status(404).json({
                success: false,
                message: "UserId not found"
            })
        }

        const user = await User.findById(userId)

        user.email = email

        await user.save()

        //Send a success response after updatting the email.
        res.send({
            success: true,
            message: "Email update successfully"
        })

    }
    catch (error) {
        console.log(error)
        res.status(500).json(error.message)


    }


}

const updateUserPassword = async (req, res) => {

    try {

        const userId = req.params.userId
        const previousPassword = req.body.updatePassword.previousPassword
        const newPassword = req.body.updatePassword.newPassword

        if (!userId) {
            return res.status(404).json({
                success: false,
                message: "UserId not found"
            })
        }

        const user = await User.findById(userId)

        //Compare the previous password with the Saved hashed password.
        const passwordMatch = await bcrypt.compare(
            previousPassword,
            user.password
        )

        //Stop the change password process if the previous password if incorrect.
        if (!passwordMatch) {
            return (
                res.send({
                    passwordNotMatch: true,
                    passwordMessage: "Password not match"
                })
            )
        }

        //hash the new password before saving it.
        const hashedPassword = await bcrypt.hash(newPassword, 10)

        user.password = hashedPassword

        await user.save()




        res.send({
            success: true,
            message: "Password update successfully"
        })

    }
    catch (error) {
        console.log(error)
        res.status(500).json(error.message)


    }


}

module.exports = {
    signupUser,
    loginUser,
    getUserdata,
    updateUsername,
    updateUserEmail,
    updateUserPassword
}