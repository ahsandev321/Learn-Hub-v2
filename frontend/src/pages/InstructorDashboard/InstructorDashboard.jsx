import React, { useState } from 'react'
import TeacherDashboardMenue from '../../components/TeacherDashboardMenue/TeacherDashboardMenue'
import './Teacher.css'
import UseMyStudents from './UseMyStudents'
import InstructorDashboardComponent from './InstructorDashboardComponent'
import { Oval } from 'react-loader-spinner'


function InstructorDashboard() {

  //Track student deletion and assignment read requests.
  const [deleteindux, setDeleteindux] = useState(null)
  const [readAssignments, setReadAssignments] = useState(null)

  //Fetch dashboard data and handle student-related actions.
  const { loading, error, students, myCourses, unreadAssignments } = UseMyStudents({ deleteindux, readAssignments })

  //Confirm and delete a student from the selected course.
  const deleteStudent = (data) => {

    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${data.student.name} from this course`
    )

    if (!confirmDelete) return

    const studentData = {
      studentId: data.student._id,
      courseId: data.courses._id
    }

    setDeleteindux(studentData)

  }

  //Render a dashboard card fro each student.
  const studentList = students.map((data) => (

    <InstructorDashboardComponent
      key={data._id}
      data={data}
      deleteStudent={deleteStudent}
      unreadAssignments={unreadAssignments}
      setReadAssignments={setReadAssignments}

    />

  ))

  return (
    <div className='teacher-main-container'>


      {/*Display a loader while API request are running. */}
      {loading && (<div className='loading-section'> <div className='loading-title'> <Oval width={27} height={27} strokeWidth={5} visible={true} color="white" secondaryColor="rgb(79, 77, 77)" /><h1>Loading...</h1></div> </div>)}

      {/*Display an error message when a request fails. */}
      {error && (<div className='error-section'> <div className='error-title'><h1>Some thing went wrong...</h1></div> </div>)}




      <TeacherDashboardMenue />

      <div className='teacher-dashboard-main-contaniner'>

        {/*Display courses, student, and enrllment statistics. */}
        <div className='teacher-dashboard-card-section'>

          <div className='teacher-dashboard-detail'>

            <h1> MY Courses</h1>
            <h1> {myCourses.length} </h1>
          </div>

          <div className='teacher-dashboard-detail'>
            <h1> Students</h1>
            <h1> {students.length} </h1>
          </div>

          <div className='teacher-dashboard-detail'>
            <h1> Enrollments</h1>
            <h1> {students.length} </h1>
          </div>


        </div>

        {/*Display student csrds or an empty state. */}
        <div className='teacher-recent-cources-section'>

          <h1> MY Students</h1>
          {studentList.length === 0 ? (
            <div className='teacher-no-recent-cources-maincontainer'>
              <h2> Empty  </h2>
            </div>
          ) : (
            <div className='teacher-recent-cources-maincontainer'>
              {studentList}
            </div>
          )}


        </div>
      </div>

    </div>
  )
}

export default InstructorDashboard
