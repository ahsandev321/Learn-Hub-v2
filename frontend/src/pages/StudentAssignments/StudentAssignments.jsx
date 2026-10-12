import React from 'react'
import UseStudentAssignments from './UseStudentAssignments'
import './StudentAssignments.css'
import { Oval } from 'react-loader-spinner'
import StudentAssignmentsComponents from './StudentAssignmentsComponents'

function StudentAssignments() {

  //Get assignment data and request states.
  const { error, loading, assignments } = UseStudentAssignments()

  //Render the list of student assignments.
  const assignmentsList = assignments.map((data) => (

    <StudentAssignmentsComponents
      key={data._id}
      data={data}
    />

  ))


  return (
    <div className='Student-Assignments-mincontainer'>

      {/*Show loading screen while API is working. */}
      {loading && (<div className='loading-section'> <div className='loading-title'> <Oval width={27} height={27} strokeWidth={5} visible={true} color="white" secondaryColor="rgb(79, 77, 77)" /><h1>Loading...</h1></div> </div>)}

      {/*Show loading screen while API is working. */}
      {error && (<div className='error-section'> <div className='error-title'><h1>Some thing went wrong...</h1></div> </div>)}

      {/*Main student assignment section. */}
      <div className='Student-Assignments-mincontainer-section'>
        <div className='Student-Assignments-student-section'>

          <h1>Student Assignments</h1>

          <div className='Student-Assignments-student-content'>

            {/*Display an empty state or the assignment list. */}
            {assignments.length === 0 ? (<div className='Student-Assignments-no-assignments'>
              <h2> No Assignment Submitted</h2>
            </div>)

              :

              (<div className='Student-Assignments-assignments-section'>
                {assignmentsList}

              </div>)}




          </div>


        </div>
      </div>


    </div>
  )
}

export default StudentAssignments
