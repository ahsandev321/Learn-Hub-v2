import React, { useEffect, useRef, useState } from 'react'
import './AdminDashboard.css'
import { FaGear } from "react-icons/fa6"
import { FaChevronRight } from "react-icons/fa"
import { Oval } from 'react-loader-spinner'
import { NavLink } from "react-router-dom"
import UseAdminDashboard from './UseAdminDashboard'
import AdminTeacherComponent from './AdminTeacherComponent'
import AdminStudentsComponent from './AdminStudentsComponent'
import AdminContactUsComponent from './AdminContactUsComponent'
import { FaCircle } from 'react-icons/fa6'

function AdminDashboard() {

  //Manage the dropdowns and selected user or content IDs.
  const [teacherDropdown, setTeacherDropdown] = useState(false)
  const [studentDropdown, setStudentDropdown] = useState(false)
  const [coursesDropdown, setCoursesDropdown] = useState(false)

  const [instructorId, setInstructorId] = useState(null)
  const [studentindux, setStudentindux] = useState(null)
  const [teacherCourses, setTeacherCourses] = useState(null)
  const [coursesindux, setCoursesindux] = useState(null)
  const [messageindux, setMessageindux] = useState(null)

  //Store references to close dropdowns when clicking outside.
  const teacherDropdownRef = useRef(null)
  const studentDropdownRef = useRef(null)
  const coursesDropdownRef = useRef(null)

  //Get dashboard data and actions form the custom hook.
  const { loading, error, messages, status, students, teachers, courses, markMessageAsRead } = UseAdminDashboard({ messageindux, instructorId, studentindux, teacherCourses, coursesindux, setCoursesindux })

  //Display all contact message using the child component.
  const messagesList = messages.map((data) => {


    const messageId = (data) => {

      setMessageindux(data._id)

    }

    return (

      <AdminContactUsComponent
        key={data._id}
        data={data}
        messageId={messageId}

      />
    )

  })

  //Display teachers and confirm before deleteing a teacher.
  const teachersList = teachers.map((teacherData) => {

    const teacherId = (teacherData) => {

      const confrimDelete = window.confirm(`Are you sure you want to delete ${teacherData.name}?\n\nThis also will be delete all associated courses, videos and assignment. This action cannot be undone`)

      if (confrimDelete) {
        setInstructorId(teacherData._id)
      }

    }

    return (
      <AdminTeacherComponent
        key={teacherData._id}
        teacherData={teacherData}
        teacherId={teacherId}
        courses={courses}
        setTeacherCourses={setTeacherCourses}
        setCoursesindux={setCoursesindux}
      />
    )

  })

  //Display all students using the child component.
  const studentsList = students.map((studentData) => {

    const studentId = (studentData) => {
      setStudentindux(studentData._id)
    }

    return (
      <AdminStudentsComponent
        key={studentData._id}
        studentData={studentData}
        studentId={studentId}
      />
    )

  })



  useEffect(() => {
    const handleClickEffect = (e) => {

      if (teacherDropdownRef.current && !teacherDropdownRef.current.contains(e.target)) {
        setTeacherDropdown(false)
      }
      if (studentDropdownRef.current && !studentDropdownRef.current.contains(e.target)) {
        setStudentDropdown(false)
      }
      if (coursesDropdownRef.current && !coursesDropdownRef.current.contains(e.target)) {
        setCoursesDropdown(false)
      }

    }
    //Add a click event listener.
    window.addEventListener("click", handleClickEffect)

    //Remove the event listener when the component unmounts.
    return () => {
      window.removeEventListener("click", handleClickEffect)
    }


  }, [])

  //Shoe a notification when unread message are available.
  const unReadMessage = messages.some((messages) => messages.isRead !== true)

  //Toggle the message dropdown and mark messages as read when opened.
  const messageDropdown = () => {

    const isOpen = !coursesDropdown

    setCoursesDropdown(isOpen)

    if (isOpen) {
      markMessageAsRead()
    }
  }

  return (
    <div className='admin-dashboard-maincontainer'>

      {/*Show loading screen while API is working. */}
      {loading && (<div className='loading-section'> <div className='loading-title'> <Oval width={27} height={27} strokeWidth={5} visible={true} color="white" secondaryColor="rgb(79, 77, 77)" /><h1>Loading...</h1></div> </div>)}

      {/*Show loading screen while API is working. */}
      {error && (<div className='error-section'> <div className='error-title'><h1>Some thing went wrong...</h1></div> </div>)}



      <div className='admin-header-section'>

        <h1>Admin Dashboard </h1>

        <div className='admin-setting-button-section'>

          <NavLink to='/settings'>
            <button className='admin-setting-button'> <FaGear className='admin-setting-button-icon' /> </button>
          </NavLink>

        </div>
      </div>

      {/*Display dashboard statistics. */}
      <div className='admin-cards-section'>

        <div className='admin-cards'>
          <h3>Total users</h3>
          <h3>{status.totlelUser === 0 ? "___" : status.totlelUser - 1} </h3>

        </div>

        <div className='admin-cards'>
          <h3>Total Courses</h3>
          <h3>{status.totlelCourses === 0 ? "___" : status.totlelCourses} </h3>

        </div>

        <div className='admin-cards'>
          <h3>Teachers</h3>
          <h3>{status.totelInstructors === 0 ? "___" : status.totelInstructors}</h3>

        </div>

        <div className='admin-cards'>
          <h3>Studetns</h3>
          <h3>{status.totelStudents === 0 ? "___" : status.totelStudents} </h3>

        </div>

      </div>

      <div className='admin-management-section'>
        <h1>Management</h1>

        {/*Manage contact message and show and unread notification. */}
        <div className={coursesDropdown ? "admin-management-card-open-section" : "admin-management-card-close-section"} ref={coursesDropdownRef} >

          <div className='admin-management-card-heading-sections'>

            <h2> Messages</h2>
            {unReadMessage && (<FaCircle className='admin-new-message-icon' />)}

            <button className='admin-management-card-button' onClick={messageDropdown}>
              <FaChevronRight className={coursesDropdown ? "admin-management-card-icon-move" : "admin-management-card-icon"} />
            </button>

          </div>

          {messages?.length !== 0 ? (<div className='admin-users-maincontainer'>
            {messagesList}
          </div>) : (<div className='admin-no-users-maincontainer'>
            <h2>No messages available</h2>
            <p>There are currently no messages to display</p>
          </div>)}


        </div>
        {/*Manage teachers and display their details. */}
        <div className={teacherDropdown ? "admin-management-card-open-section" : "admin-management-card-close-section"} ref={teacherDropdownRef} >

          <div className='admin-management-card-heading-sections'>

            <h2>Manage Teachers</h2>

            <button className='admin-management-card-button' onClick={() => setTeacherDropdown(!teacherDropdown)}>
              <FaChevronRight className={teacherDropdown ? "admin-management-card-icon-move" : "admin-management-card-icon"} />
            </button>

          </div>

          {teachers?.length !== 0 ? (<div className='admin-users-maincontainer'>
            {teachersList}
          </div>) : (<div className='admin-no-users-maincontainer'>
            <h2>No teachers available</h2>
            <p>There are currently no teachers to display</p>
          </div>)}


        </div>

        {/*Manage students and display their details */}
        <div className={studentDropdown ? "admin-management-card-open-section" : "admin-management-card-close-section"} ref={studentDropdownRef} >

          <div className='admin-management-card-heading-sections'>

            <h2>Manage Students</h2>

            <button className='admin-management-card-button' onClick={() => setStudentDropdown(!studentDropdown)}>
              <FaChevronRight className={studentDropdown ? "admin-management-card-icon-move" : "admin-management-card-icon"} />
            </button>

          </div>

          {students?.length !== 0 ? (<div className='admin-users-maincontainer'>
            {studentsList}
          </div>) : (<div className='admin-no-users-maincontainer'>
            <h2>No students available</h2>
            <p>There are currently no students to display</p>
          </div>)}


        </div>



      </div>


    </div>
  )
}

export default AdminDashboard
