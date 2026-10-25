import React from 'react'

function AdminStudentsComponent({ studentData, studentId }) {
       return (
              <div className='admin-users-cards-section'>

                     {/*Show student name. */}
                     <div className='admin-users-cards-heading-section'>
                            <h1>Name : </h1>
                     </div>
                     <div className='admin-users-cards-text-section'>
                            <h1>{studentData.name} </h1>
                     </div>

                     {/*Show student email. */}
                     <div className='admin-users-cards-heading-section'>
                            <h1>Email : </h1>
                     </div>
                     <div className='admin-users-cards-text-section'>
                            <h1>{studentData.email} </h1>
                     </div>

                     {/*show student role. */}
                     <div className='admin-users-cards-heading-section'>
                            <h1>Role : </h1>
                     </div>
                     <div className='admin-users-cards-text-section'>
                            <h1>{studentData.role} </h1>
                     </div>

                     {/*Delete the selected student. */}
                     <div className='admin-users-cards-button-section'>

                            <button className='admin-users-cards-delete-button' onClick={() => studentId(studentData)}  >Delete</button>

                     </div>


              </div>
       )
}

export default AdminStudentsComponent
