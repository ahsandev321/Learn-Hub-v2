import React from 'react'
import './StudentDashboard.css'
import UseMycourses from './UseMycourses'
import { Oval } from 'react-loader-spinner'
import CourseCards from '../../components/CourseCards/CourseCards'
import { useNavigate } from 'react-router-dom'
import { FaGear } from "react-icons/fa6"
import { NavLink } from 'react-router-dom'

function StudentDashboard() {

  const { loading, error, myCourse, } = UseMycourses()

  const navigae = useNavigate()

  //Open the selected course and save ites ID
  const handleOpen = (data) => {

    localStorage.setItem("myCourseId", data._id)
    navigae("/studentCourses")

  }

  //Create a card for each course.
  const coursesList = myCourse.map((data) => (
    <CourseCards
      key={data._id}
      data={data.courses}
      text={"Open"}
      handleOpen={handleOpen}
    />
  ))


  return (
    <div className='studentDashboard-maincontainer'>


      {/*Show a loader while courses are loading.  */}
      {loading && (<div className='loading-section'> <div className='loading-title'> <Oval width={27} height={27} strokeWidth={5} visible={true} color="white" secondaryColor="rgb(79, 77, 77)" /><h1>Loading...</h1></div> </div>)}

      {/*Show an error message if loading fails.*/}
      {error && (<div className='error-section'> <div className='error-title'><h1>Some thing went wrong...</h1></div> </div>)}

      <div className='studentDashboard-content-maincontainer'>

        {/*Dashboard heading. */}
        <div className='studentDashboard-heading-section'>


        <div className='studentDashboard-setting-section'>

          <h1>My Courses</h1>

          <div className='studentDashboard-setting-button-section'>

            <NavLink to='/settings'>
              <button className='studentDashboard-setting-button'> <FaGear className='studentDashboard-setting-button-icon' /> </button>
            </NavLink>

          </div>
        </div>
         
        </div>
        {/*Show course cards or an empty state. */}
        {coursesList.length === 0 ? (
          <div className='studentDashboard-no-content-section' >
            <h2> No Courses yet </h2>
          </div>
        ) : (
          <div className='studentDashboard-maincontainer-section'>
            <div className='studentDashboard-content-section'>

              {coursesList}



            </div>
          </div>
        )
        }

      </div >

    </div >
  )
}

export default StudentDashboard
