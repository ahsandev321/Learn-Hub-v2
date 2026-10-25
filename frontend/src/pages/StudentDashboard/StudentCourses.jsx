import React, { isValidElement, useEffect, useState } from 'react'
import UseStudentCourses from './UseStudentCourses'
import StudentCoursesComponent from './StudentCoursesComponent'
import { FaBars, FaTimes } from 'react-icons/fa'
import { Oval } from 'react-loader-spinner'
import './StudentCourses.css'
import UseViewContent from './UseViewContent'
import { useNavigate } from 'react-router-dom'
import { io } from 'socket.io-client'

function StudentCourses() {

  const navigate = useNavigate()

  //Assignment form state.
  const [assignmentFile, setAssignmentFile] = useState(null)
  const [assignmentDescription, setAssignmentDescription] = useState("")
  const [emptyForm, setEmptyForm] = useState(false)

  //Course content selection state.
  const [selectContent, setSelectContent] = useState(null)
  const [slider, setSlider] = useState(false)
  const [assignment, setAssignment] = useState(null)
  const [contentStatus, setContentStatus] = useState(null)

  //Manage content view status.
  const { contentStatusLoading, contentStatusError, viewedContent } = UseViewContent({ contentStatus })

  //Fetch course videos and assignmets.
  const { loading, error, videos, assignmets, studentAssignmet, isEnrolled, clearCourseData } = UseStudentCourses({ assignment })

  //Redirect students who are not enrolled. 
  useEffect(() => {
    if (!isEnrolled) {
      navigate("/studentDashboard", { replace: true })

    }
  }, [isEnrolled, navigate])

  //Listen for student removal events.
  useEffect(() => {

    const socket = io("http://localhost:3000")

    const studentId = localStorage.getItem("userId")

    const courseId = localStorage.getItem("myCourseId")

    socket.emit("joinStudentRoom", studentId)

    socket.emit("joinCourseRoom", courseId)


    socket.on("studentRemove", () => {

      navigate("/studentDashboard", { replace: true })

      clearCourseData()

    })

    socket.on("courseDeleted", () => {

      navigate("/studentDashboard", { replace: true })

      clearCourseData()

    })

    socket.on("studentAccountDeleted", () => {
      localStorage.removeItem("login")
      localStorage.removeItem("role")
      localStorage.removeItem("userId")
      localStorage.removeItem("myCourses")
      localStorage.removeItem("courseId")
      localStorage.removeItem("myCourseId")
      localStorage.removeItem("selectedStudentId")
      localStorage.removeItem("token")

      //Redirect the user to the login page.
      navigate('/login', { replace: true })

      //Notify other components about the login status change.
      window.dispatchEvent(new Event("loginChanged"))

      clearCourseData()

      navigate("/login", { replace: true })



    })

    return () => {
      socket.disconnect()
    }


  }, [])


  //Combine and sort videos and assignments.
  const allContent = [

    ...videos.map((videos) => ({
      ...videos,
      contentType: 'videos'
    })),
    ...assignmets.map((assignment) => ({
      ...assignment,
      contentType: 'assignment'
    })),

  ].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))

  //Updaet the viewwd content status.
  const viewContent = (data) => {
    const studentId = localStorage.getItem("userId")

    const courseId = localStorage.getItem("myCourseId")

    const contentData = {
      studentId: studentId,
      contentId: data._id,
      contentType: data.contentType,
      courseId: courseId
    }

    setContentStatus(contentData)

  }

  //Render the course content list.
  const courseList = allContent.map((data) => {


    const isviewed = viewedContent.some((items) => items.content?.toString() === data?._id?.toString() && items.contentType?.toString() === data?.contentType?.toString())


    return (
      <StudentCoursesComponent
        key={data._id}
        data={data}
        setSelectContent={setSelectContent}
        selectContent={selectContent}
        viewContent={viewContent}
        isviewed={isviewed}
      />
    )
  })

  //Check whether the assignment has been submitted.
  const isSubmit = studentAssignmet.some((data) => data?.assignment?._id.toString() === selectContent?.data?._id?.toString())


  //Handle assignment submission.
  const submitAssigment = (e) => {

    e.preventDefault()

    setEmptyForm(true)

    if (!assignmentFile) return

    const studentId = localStorage.getItem("userId")

    const assignmentId = selectContent.data._id

    //Prepare assignment data for upload.
    const formData = new FormData()

    formData.append("studentId", studentId)
    formData.append("assignmentId", assignmentId)
    formData.append("assignment", assignmentFile)
    formData.append("description", assignmentDescription)

    setAssignment(formData)

    setEmptyForm(false)

  }

  return (

    <div className='student-course-maincontainer'>

      {/*Display loading and error states.*/}
      {loading && (<div className='loading-section'> <div className='loading-title'> <Oval width={27} height={27} strokeWidth={5} visible={true} color="white" secondaryColor="rgb(79, 77, 77)" /><h1>Loading...</h1></div> </div>)}

      {error && (<div className='error-section'> <div className='error-title'><h1>Some thing went wrong...</h1></div> </div>)}

      {/*Display content status loading and errors. */}
      {contentStatusLoading && (<div className='loading-section'> <div className='loading-title'> <Oval width={27} height={27} strokeWidth={5} visible={true} color="white" secondaryColor="rgb(79, 77, 77)" /><h1>Loading...</h1></div> </div>)}

      {contentStatusError && (<div className='error-section'> <div className='error-title'><h1>Some thing went wrong...</h1></div> </div>)}


      {/*Main course content section. */}
      <div className='student-course-data-section'>


        <h1> Course Content</h1>
        <div className='student-course-data'>

          {/*Course content sidebar. */}
          <div className={!slider ? 'student-course-list-slider-open' : 'student-course-list-slider-close'}>

            <button onClick={() => setSlider(!slider)} className='student-course-list-slider-button'>{!slider ? <FaTimes /> : <FaBars />}</button>

            <div className={courseList.length === 0 ? 'student-course-list-no-titles-section' : 'student-course-list-titles-section'}>

              {courseList.length === 0 ? (<h3> No Uploads yet </h3>) : (<div className='student-course-list-titles-maincontainer'>{courseList} </div>)}

            </div>
          </div>

          {/*Display selected video or assignment. */}
          <div className='student-course-data-display-maincontainer'>
            {
              selectContent?.type === "videos" ? (
                <div className='student-course-data-video-section'>

                  <video src={selectContent.data.videoUrl}
                    controls
                    width='100%' height='100%'
                    controlsList='nodownload'
                    onContextMenu={(e) => e.preventDefault()}
                    className='student-course-data-video'
                  />

                  <div className='student-course-data-video-title'>
                    <h1>{selectContent.data.title}</h1>
                  </div>
                </div>
              ) : selectContent?.type === "assignment" ? (
                <div className='student-course-data-assignment-section'>
                  <h1>Assignment Instructions</h1>
                  <div className='student-course-data-assignment-title-section'>
                    <p>{selectContent.data.title}</p>

                    {/*Assignmet file link. */}
                    <div className='student-course-data-assignment'>
                      <a href={selectContent.data.fileUrl} className='student-course-data-assignment-link'>open assignmet</a>
                    </div>
                    {/*Show submission status or assignment form. */}
                    {isSubmit ? (
                      <div> assignmet submit successfully </div>
                    ) : (
                      <div className='student-course-submit-assignment-maincontainer'>
                        <form onSubmit={submitAssigment} >

                          <div className='student-course-content-input-field-section'>

                            {/*Assignment file input */}
                            <div className='student-course-file-input-section'>
                              <h1>Choose Assignment</h1>

                              <div className={emptyForm && !assignmentFile ? "student-course-file-invalid-input-field-section" : "student-course-file-input-field-section"}>


                                <input type="file"
                                  accept=".doc,.docx,.pdf"
                                  className='student-course-file-input-field'
                                  onChange={(e) => setAssignmentFile(e.target.files[0])}
                                />

                              </div>

                            </div>

                            {/*Assignment description input. */}
                            <div className='student-course-input-section'>
                              <h1>Description</h1>
                              <input type="text"
                                placeholder='Enter Description'
                                className="student-course-input-field"
                                value={assignmentDescription}
                                onChange={(e) => setAssignmentDescription(e.target.value)}
                              />
                            </div>

                            {/*Sunmit assignment button */}
                            <div className='student-course-upload-button-section'>
                              <button className='student-course-upload-button' > submit </button>
                            </div>


                          </div>
                        </form>
                      </div>

                    )}

                  </div>
                </div>
              ) : (
                //show a message when no course is selected.
                <div className='student-course-no-data-section'>
                  <h3>No selected content</h3>
                </div>
              )
            }

          </div>
        </div>
      </div>

    </div>

  )
}

export default StudentCourses
