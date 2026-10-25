import React from 'react'
import { Navigate } from 'react-router-dom'

function StudentCoursesSecurerouter({ children, allowedRole }) {

    //Get users login status token and user role.
    const token = localStorage.getItem("token")

    const login = localStorage.getItem("login")

    const role = localStorage.getItem("role")

 //redirect users who do not have a tocken.
    if (!token) {
        return (
            <Navigate to='/login' replace />
        )
    }

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



export default StudentCoursesSecurerouter









