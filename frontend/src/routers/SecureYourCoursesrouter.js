import React from 'react'

import { Navigate } from 'react-router-dom'

function SecureYourCoursesrouter({ children }) {

  //Get the users token and course status.
  const token = localStorage.getItem("token")

  const myCourses = localStorage.getItem("myCourses")

  //redirect users who do not have a tocken.
  if (!token) {
    return (
      <Navigate to='/login' replace />
    )
  }

  //Redirect users who do not have their own courses.
  if (myCourses !== "true") {

    return (
      <Navigate to='/addcourses' replace />
    )
  }

  //Allow access to the protected page.
  return children;
}

export default SecureYourCoursesrouter
