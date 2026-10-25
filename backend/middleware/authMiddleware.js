const jwt = require("jsonwebtoken")
const User = require("../model/SignuserModel")

const authMiddleware = async (req, res, next) => {

    try {

        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: 'Authorization token is required'
            })
        }

        const token = authHeader.split(" ")[1]

        //Verify the token and get the user's ID
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET

        )

        const user = await User.findById(decoded.id)


        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Authorization token is required'
            })
        }

        //Attach the decoded user data to the request.
        req.user = decoded

        next()


    }
    catch (error) {

        res.status(401).json(error.message)

    }
}


module.exports = authMiddleware