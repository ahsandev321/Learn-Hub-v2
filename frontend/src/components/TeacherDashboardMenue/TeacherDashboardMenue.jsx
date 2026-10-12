import React, { useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import './TeacherDashboardMenue.css'

function TeacherDashboardMenue() {

  //Store the dropdown menue state.
  const [dropdown, setDropdown] = useState(false)
  return (
    //Show the menue based on its current state.
    <div className={!dropdown ? 'teacher-links-section-close' : 'teacher-links-section-open'}>

      {/*Toggle the menue open and closed */}
      <button onClick={() => setDropdown(!dropdown)} className='teacher-links-icon' >{!dropdown ? <FaBars /> : <FaTimes />}</button>

      {/*Teacher dashboard navigation links */}
      <div className='teacher-menue-links'>

        {/*Dashboard link with active state styling. */}
        <NavLink to='/instructorDashboard' className='teacher-navigation-link' >
          {
            ({ isActive }) => {
              return (
                <div className={isActive ? 'teacher-dashboard-active-link' : 'teacher-dashboard-link'}><h1>Dashboard</h1></div>
              )
            }
          }
        </NavLink>

        {/*Add courses link with active state styling. */}
        <NavLink to='/addcourses' className='teacher-navigation-link' >
          {
            ({ isActive }) => {
              return (
                <div className={isActive ? 'teacher-dashboard-active-link' : 'teacher-dashboard-link'}><h1>Add Courses </h1></div>
              )
            }
          }
        </NavLink>


      </div>
    </div>
  )
}

export default TeacherDashboardMenue
