import React from 'react'

function StudentAssignmentsComponents({ data }) {
        return (
                //Display the details of a single student assignments.
                <div className='Student-Assignments-assignments-content'>

                        {/*Assignment title. */}
                        <div className='Student-Assignments-assignments-titles-heading-section'>
                                <h1 className='Student-Assignments-assignments-titles-heading'> Assignment :  </h1>
                                <h1 Student-Assignments-assignments-titles>  {data.assignment?.title}</h1>
                        </div>

                        {/*Assignment title. */}
                        <div className='Student-Assignments-assignments-heading' >
                                <h1>Name :</h1>
                        </div>
                        <div className='Student-Assignments-assignments-text'>
                                <h2> {data.student?.name} </h2>
                        </div>

                        {/*Student name. */}
                        <div className='Student-Assignments-assignments-heading' >
                                <h1>Email :</h1>
                        </div>
                        <div className='Student-Assignments-assignments-text'>
                                <h2> {data.student?.email} </h2>
                        </div>

                        {/*Assignment description. */}
                        <div className='Student-Assignments-assignments-heading' >
                                <h1>Description :</h1>
                        </div>
                        <div className='Student-Assignments-assignments-text'>
                                <h2> {data.description} </h2>
                        </div>

                        {/*Assignment submission status. */}
                        <div className='Student-Assignments-assignments-heading' >
                                <h1>Status :</h1>
                        </div>
                        <div className='Student-Assignments-assignments-text'>
                                <h2> {data.status} </h2>
                        </div>

                        {/*Assignment submission date. */}
                        <div className='Student-Assignments-assignments-heading' >
                                <h1>Submitted :</h1>
                        </div>
                        <div className='Student-Assignments-assignments-text'>
                                <h2> {new Date(data.createdAt).toLocaleDateString()} </h2>
                        </div>

                        {/*Link to the submitted assignmnet file. */}
                        <div className='Student-Assignments-assignments-file-section'>

                                <a href={data.fileUrl} className='Student-Assignments-assignments-file-link'> open assignment </a>

                        </div>

                </div>
        )
}

export default StudentAssignmentsComponents
