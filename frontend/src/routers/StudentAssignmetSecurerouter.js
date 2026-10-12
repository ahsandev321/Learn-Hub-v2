import React from 'react'
import { Navigate } from 'react-router-dom'


function StudentAssignmetSecurerouter({ children, allowedRole }) {

    //Get the login status and user role.
    const login = localStorage.getItem("login")

    const role = localStorage.getItem("role")

    //Redirect users who are not logged in.
    if (login !== "true") {
        return (
            <Navigate to='/courses' replace />
        )
    }

    //Redirect users who do not have required role.
    if (role !== allowedRole) {
        return (
            <Navigate to='/courses' replace />

        )
    }

    //Allow access to the protected page.
    return children;

}



export default StudentAssignmetSecurerouter
