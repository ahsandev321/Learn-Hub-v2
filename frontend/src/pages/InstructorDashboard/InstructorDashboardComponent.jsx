import React from 'react'
import { NavLink } from 'react-router-dom';
import { FaCircle } from 'react-icons/fa'

function InstructorDashboardComponent({ data, deleteStudent, unreadAssignments, setReadAssignments }) {


  //Mark the selected student's assignments as read.
  const openStudentAssignments = () => {

    localStorage.setItem("selectedStudentId", data.student._id)

    setReadAssignments({
      studentId: data.student._id,
      courseId: data.courses._id
    })


  }

  //Check wherther ther student has unread assignments for this course.
  const studentUnreadAssignment = unreadAssignments?.some((items) =>
    items.student?._id === data.student._id && items.assignment?.course?._id === data.courses._id)




  return (
    <div className='teacher-recent-cources-card'>

      {/*Show an indicator when unread assignments exist. */}
      {studentUnreadAssignment && (
        <FaCircle className='teacher-text-read-assignment-dot' />
      )}

      {/*Display the platform branding. */}
      <div className='teacher-logo-section'>
        <h1> <span className='teacher-logo-text'>Learn</span>Hub</h1>
      </div>

      {/*Student name. */}
      <div className='teacher-heading-section'>

        <h1>Name :</h1>

      </div>
      <div className='teacher-text-section'>
        <h3> {data.student.name}  </h3>


      </div>

      {/*Enrolled course details. */}
      <div className='teacher-heading-section'>

        <h1>Course :</h1>

      </div>
      <div className='teacher-text-section'>
        <h3> {data.courses.title} </h3>
      </div>

      {/* Open assignments or remove the student.*/}
      <div className='teacher-card-button-section'>
        <NavLink to='/studentAssignments' className='teacher-card-open-button-link' ><button className='teacher-card-open-button' onClick={openStudentAssignments}  > Open </button></NavLink>
        <button className='teacher-card-open-delete-button' onClick={() => deleteStudent(data)} > Delete </button>
      </div>

    </div>
  )
}

export default InstructorDashboardComponent
