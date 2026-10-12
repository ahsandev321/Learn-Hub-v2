import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import './Allcourses.css'
import CourseCards from '../../components/CourseCards/CourseCards.jsx'
import UseAllCourses from './UseAllCourses.js';
import { Oval } from 'react-loader-spinner'
import UseEnrollment from './UseEnrollment.js'
function Allcourses() {

  //Store course enrollment data
  const [enrolledData, setEnrolledData] = useState(null)

  const navigate = useNavigate()

  //Handle course enrollment and its status.
  const { enrolledLoading, enrollederror, alreadyEnrolled, enrolled, setAlreadyEnrolled, setEnrolled } = UseEnrollment({ enrolledData })

  //Fetch all available courses.
  const { loading, error, course } = UseAllCourses()


  //Check user access before enrolling in a course.
  const handleBuy = (data) => {

    const userId = localStorage.getItem("userId")

    const role = localStorage.getItem("role")

    //Redirect unauthenticated user to the login page.
    if (!userId) {

      navigate("/login");
      return
    }

    //Allow only student to enroll in courses.
    if (role !== "student") {
      alert("Only student accounts can enroll in courses")
      return
    }

    //Enroll the student directly if the course id free
    if (data.price === 0) {

      const courseData = {
        studentId: userId,
        courseId: data._id
      }

      setEnrolledData(courseData)

      return
    }


  }

  //Render a course card for each available course.
  const coursesList = course.map((data) => (

    <CourseCards
      key={data._id}
      data={data}
      text={"BUY"}
      handleBuy={handleBuy}
    />

  ))

  //Show a message if the student is already enrolled.
  useEffect(() => {

    if (alreadyEnrolled) {
      alert("You already enrolled in this course")

      setAlreadyEnrolled(false)
    }



  }, [alreadyEnrolled])

  //Show a message after successful enrollment.
  useEffect(() => {

    if (enrolled) {
      alert("Course enrolled successfully")

      setEnrolled(false)

    }



  }, [enrolled])



  return (
    <div className='allcourses-maincontainer'>

      {/*Display loading and error states for course fetching. */}
      {loading && (<div className='loading-section'> <div className='loading-title'> <Oval width={27} height={27} strokeWidth={5} visible={true} color="white" secondaryColor="rgb(79, 77, 77)" /><h1>Loading...</h1></div> </div>)}

      {error && (<div className='error-section'> <div className='error-title'><h1>Some thing went wrong...</h1></div> </div>)}

      {/*Display loading and error states for enrollment. */}
      {enrolledLoading && (<div className='loading-section'> <div className='loading-title'> <Oval width={27} height={27} strokeWidth={5} visible={true} color="white" secondaryColor="rgb(79, 77, 77)" /><h1>Loading...</h1></div> </div>)}

      {enrollederror && (<div className='error-section'> <div className='error-title'><h1>Some thing went wrong...</h1></div> </div>)}


      <div className='allcourses-content-maincontainer'>

        {/* Display the page heading and available courses. */}
        <div className='allcourses-heading-section'>

          <h1>Explore Courses</h1>
        </div>

        {/*Show an empty message when no courses are available. */}
        {coursesList.length === 0 ? (
          <div className='allcourses-no-content-section'>
            <h2> No Explore Courses yet </h2>
          </div>
        ) : (
          <div className='allcourses-maincontainer-section'>
            <div className='allcourses-content-section'>

              {coursesList}



            </div>
          </div>
        )
        }

      </div >

    </div >
  )
}

export default Allcourses
