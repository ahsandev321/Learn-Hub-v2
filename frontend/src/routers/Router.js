import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import MainLayout from '../layout/MainLayout'
import Home from '../pages/home/Home'
import Login from '../pages/login/Login'
import Signup from '../pages/signup/Signup'
import StudentDashboard from '../pages/StudentDashboard/StudentDashboard'
import InstructorDashboard from '../pages/InstructorDashboard/InstructorDashboard'
import SecureYourCoursesrouter from './SecureYourCoursesrouter'
import Securerouter from './Securerouter'
import AddCourses from '../pages/AddCourses/AddCourses'
import ManageCourse from '../pages/manageCourse/ManageCourse'
import Allcourses from '../pages/AllCourses/Allcourses'
import StudentCourses from '../pages/StudentDashboard/StudentCourses'
import StudentCoursesSecurerouter from './StudentCoursesSecurerouter'
import StudentAssignmetSecurerouter from './StudentAssignmetSecurerouter'
import StudentAssignments from '../pages/StudentAssignments/StudentAssignments'
import AdminDashboard from '../pages/AdminDashboard/AdminDashboard'
import AdminCourses from '../pages/AdminCourses/AdminCourses'
import Settings from '../pages/Settings/Settings'
import SecureSettings from './SecureSettings'

function Router() {

  //Create router for public and protected pages.
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='' element={<MainLayout />} >
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signUp' element={<Signup />} />
        <Route path='/courses' element={<Allcourses />} />
        
        
        {/*Allow only admin to access the admin dashboard. */}
        <Route path='/settings' element={
          <SecureSettings >
            <Settings />
          </SecureSettings>
        } />


        {/*Allow only admin to access the admin dashboard. */}
        <Route path='/adminDashboard' element={
          <Securerouter allowedRole="admin">
            <AdminDashboard />
          </Securerouter>
        } />

         {/*Allow only admin to access the admin courses. */}
        <Route path='/adminCourses' element={
          <Securerouter allowedRole="admin">
            <AdminCourses />
          </Securerouter>
        } />

        {/*Allow only student to access the student dashboard. */}
        <Route path='/studentDashboard' element={
          <Securerouter allowedRole="student">
            <StudentDashboard />
          </Securerouter>
        } />

        {/*Allow only students to access their courses. */}
        <Route path='/studentCourses' element={
          <StudentCoursesSecurerouter allowedRole="student">
            <StudentCourses />
          </StudentCoursesSecurerouter>
        } />

        {/*Allow only instructors to access the instroctor dashboard */}
        <Route path='/instructorDashboard' element={
          <Securerouter allowedRole="instructor">
            <InstructorDashboard />
          </Securerouter>
        } />

        {/*Protect the student assignments page. */}
        <Route path='/studentAssignments' element={
          <StudentAssignmetSecurerouter allowedRole="instructor">
            <StudentAssignments />
          </StudentAssignmetSecurerouter>
        } />

        {/*Allow only instructors to add courses. */}
        <Route path='/addcourses' element={
          <Securerouter allowedRole="instructor">
            <AddCourses />
          </Securerouter>
        } />

        {/*Protect course management routes. */}
        <Route path='/manageCourse' element={
          <SecureYourCoursesrouter >
            <ManageCourse />
          </SecureYourCoursesrouter>
        } />

      </Route>
    )
  )

  //Render the configured routes.
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default Router
