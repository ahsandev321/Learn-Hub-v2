import React from 'react'
import { Navigate } from 'react-router-dom'

function Securerouter({ children, allowedRole }) {

    //Get login status and user role.
    const login = localStorage.getItem("login")

    const role = localStorage.getItem("role")

    //Redirect users who are not loggrd in.
    if (login !== "true") {
        return (
            <Navigate to='/login' replace />
        )
    }

    //Redirect users who do not have the required role.
    if (role !== allowedRole) {
        return (
            <Navigate to='/login' replace />

        )
    }

    //Allow access to the protected page.
    return children;

}

export default Securerouter


