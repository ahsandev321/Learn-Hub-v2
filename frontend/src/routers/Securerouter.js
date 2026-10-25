import React from 'react'
import { Navigate } from 'react-router-dom'

function Securerouter({ children, allowedRole }) {

    //Get users login status, token and role.
    const token = localStorage.getItem("token")

    const login = localStorage.getItem("login")

    const role = localStorage.getItem("role")

    //redirect users who do not have a tocken.
    if (!token) {
        return (
            <Navigate to='/login' replace />
        )
    }

    //Redirect users who are not loggrd in.
    if (login !== "true") {
        return (
            <Navigate to='/login' replace />
        )
    }

    //Redirect users who do not have the required role.
    if (role !== allowedRole) {
        return (
            <Navigate to='/' replace />

        )
    }

    //Allow access to the protected page.
    return children;

}

export default Securerouter


