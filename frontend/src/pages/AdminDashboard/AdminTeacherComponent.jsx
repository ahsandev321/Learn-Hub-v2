import React, { useEffect, useRef, useState } from 'react'
import { FaChevronRight } from "react-icons/fa"
import AdminCourseCard from '../../components/AdminCourseCards/AdminCourseCard.jsx'


function AdminTeacherComponent({ teacherData, teacherId, setTeacherCourses, courses, setCoursesindux }) {

       const [viewCourses, setViewCourses] = useState(false)

       const viewCoursesRef = useRef(null)

       //Show or hide the teacher's courses.
       const teacherCourses = (teacherData) => {

              setViewCourses(!viewCourses)

              setTeacherCourses(teacherData._id)

       }

       useEffect(() => {
              const handleClickEffect = (e) => {

                     if (viewCoursesRef.current && !viewCoursesRef.current.contains(e.target)) {
                            setViewCourses(false)
                     }

              }
              //Add a click event listener.
              window.addEventListener("click", handleClickEffect)

              //Remove the event listener when the component unmounts.
              return () => {
                     window.removeEventListener("click", handleClickEffect)
              }


       }, [])

       //Set the course Id for deletion.
       const deleteData = (dataId) => {
              setCoursesindux(dataId)
       }

       //Display the teacher's courses.
       const coursesList = courses.map((courses) => (


              <AdminCourseCard
                     key={courses._id}
                     data={courses}
                     dataId={courses._id}
                     deleteData={deleteData}
              />
       ))


       return (
              <div className='admin-users-cards-section' ref={viewCoursesRef}>

                     {/*Show teacher name. */}
                     <div className='admin-users-cards-heading-section'>
                            <h1>Name : </h1>
                     </div>
                     <div className='admin-users-cards-text-section'>
                            <h1>{teacherData.name} </h1>
                     </div>

                     {/*Show teacher email. */}
                     <div className='admin-users-cards-heading-section'>
                            <h1>Email : </h1>
                     </div>
                     <div className='admin-users-cards-text-section'>
                            <h1>{teacherData.email} </h1>
                     </div>

                     {/*Show teacher role. */}
                     <div className='admin-users-cards-heading-section'>
                            <h1>Role : </h1>
                     </div>
                     <div className='admin-users-cards-text-section'>
                            <h1>{teacherData.role} </h1>
                     </div>

                     <div className='admin-users-cards-button-section'>

                            {/*View the teacher courses button. */}
                            <button className='admin-users-cards-view-button' onClick={() => teacherCourses(teacherData)}  > View Courses <FaChevronRight className={!viewCourses ? 'admin-users-cards-button-icon' : 'admin-users-cards-button-icon-move'} /> </button>

                            {/*Delete the selected teacher button. */}
                            <button className='admin-users-cards-delete-button' onClick={() => teacherId(teacherData)}  >Delete</button>

                     </div>

                     <div className={!viewCourses ? 'admin-teachers-courses-hide-section' : 'admin-teachers-courses-show-section'}>

                            {viewCourses && (courses?.length !== 0 ? (
                                   <div className='admin-teachers-courses-cards-maincontainer'>
                                          {coursesList}
                                   </div>
                            ) : (<div className='admin-teachers-courses-no-cards-section'>
                                   <p>No courses found</p>
                            </div>))}

                     </div>


              </div>
       )
}

export default AdminTeacherComponent
