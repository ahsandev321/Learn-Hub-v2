import React from 'react'

import { Navigate } from 'react-router-dom'

function SecureYourCoursesrouter({ children }) {

  //Check if the user has their own courses.
  const myCourses = localStorage.getItem("myCourses")

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
