
const roleMiddleware = (...allowedRoles) => {
    return (req, res, next) => {

        //Check if the user's role is allowed to access this route.
        if (!allowedRoles.includes(req.user.role)) {

            return res.status(401).json({
                message: "Access denied"
            })
        }

        next()
    }
}

module.exports = roleMiddleware