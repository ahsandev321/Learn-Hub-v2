import React from 'react'

import { Navigate } from 'react-router-dom'

function SecureSettings({children}) {

     //Get users login status, token and role.
        const token = localStorage.getItem("token")
    
        const login = localStorage.getItem("login")

    
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

  return children;
}

export default SecureSettings
