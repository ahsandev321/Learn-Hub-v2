import React, { useEffect, useRef, useState } from 'react'
import './ManageCourse.css'
import { Oval } from 'react-loader-spinner'
import UseManageCourse from './UseManageCourse'
import UseManageAssignment from './UseManageAssignment'
import ManageCourseComponent from './ManageCourseComponent'
import { FaBars, FaTimes } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { io } from 'socket.io-client'


function ManageCourse() {

  const [videoTitle, setVideoTitle] = useState("")

  const [video, setVideo] = useState(null)

  const [empty, setEmpty] = useState(false)

  const [assignmentTitle, setAssignmentTitle] = useState("")

  const [assignment, setAssignment] = useState(null)

  const [emptyForm, setEmptyForm] = useState(false)

  const [selectContent, setSelectContent] = useState(null)

  const [courseData, setCourseData] = useState(null)

  const [courseAssignment, setCourseAssignment] = useState(null)

  const [slider, setSlider] = useState(false)

  const [deleteindux, setDeleteindux] = useState(null)

  const [editVideoindux, setEditVideoindux] = useState(null)

  const [editAssignmentindux, setEditAssignmentindux] = useState(null)

  const [editVideo, setEditVideo] = useState(null)

  const [editAssignment, setEditAssignment] = useState(null)

  //Manage course videos and handle updates.
  const { loading, error, coursedata } = UseManageCourse({ courseData, deleteindux, setDeleteindux, editVideo, editVideoindux, setEditVideoindux })

  //Manage course assignments and handle updates.
  const { assignmentLoading, assignmentError, assignmentdata } = UseManageAssignment({ courseAssignment, deleteindux, setDeleteindux, editAssignment, editAssignmentindux, setEditAssignmentindux })

  const scrollRef = useRef(null)

  const navigate = useNavigate()

  useEffect(() => {

    const socket = io("http://localhost:3000")

    const courseId = localStorage.getItem("courseId")

    socket.emit("joinCourseRoom", courseId)

    socket.on("courseDeleted", () => {

       navigate("/addcourses", { replace: true })

    })

    return () => {
      socket.disconnect()
    }


  }, [])

  //Combine and sort videos and assignments by date.
  const allContent = [

    ...coursedata.map((videos) => ({
      ...videos,
      contentType: 'videos'
    })),
    ...assignmentdata.map((assignment) => ({
      ...assignment,
      contentType: 'assignment'
    })),

  ].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))

  //Delete the selected content.
  const deleteData = (data) => {
    setDeleteindux(data)
    setSelectContent(null)
  }

  //Load the selected content into the form for editing.
  const editData = (data) => {

    if (data?.contentType === "videos") {

      setVideoTitle(data.title)
      setVideo(null)

      setEditVideoindux(data._id)

      scrollRef.current?.scrollIntoView({
        behavior: "smooth"
      })
    }
    else {
      setAssignmentTitle(data.title)
      setAssignment(null)

      setEditAssignmentindux(data._id)

      scrollRef.current?.scrollIntoView({
        behavior: "smooth"
      })


    }
  }

  //Display all videos and assignments in the content list.
  const courseList = allContent.map((data) => {
    return (
      <ManageCourseComponent
        key={data._id}
        data={data}
        setSelectContent={setSelectContent}
        selectContent={selectContent}
        deleteData={deleteData}
        editData={editData}
      />
    )
  })

  //Validate the video form and upload or update the Video.
  const submitData = (e) => {
    e.preventDefault()

    setEmpty(!empty)

    if (!videoTitle || !video) return

    const courseId = localStorage.getItem("courseId")

    const formData = new FormData()

    formData.append("title", videoTitle)
    formData.append("video", video)
    formData.append("courseId", courseId)

    if (editVideoindux !== null) {

      setEditVideo(formData)

    }
    else {
      setCourseData(formData)

    }



    setEmpty(false)

    setVideoTitle('')
    setVideo(null)


  }

  //Validate the assignment form and upload or update the assignment.
  const uploadAssigment = (e) => {
    e.preventDefault()

    setEmptyForm(!emptyForm)

    if (!assignmentTitle || !assignment) return

    const courseId = localStorage.getItem("courseId")

    const instructorId = localStorage.getItem("userId")

    const formData = new FormData()

    formData.append("title", assignmentTitle)
    formData.append("assignment", assignment)
    formData.append("courseId", courseId)
    formData.append("instructorId", instructorId)

    if (editAssignmentindux !== null) {

      setEditAssignment(formData)

    }
    else {
      setCourseAssignment(formData)
    }



    setEmptyForm(false)


    setAssignmentTitle("")
    setAssignment(null)


  }

  return (
    <div className='manage-course-maincontainer'>

      {/*Display a loader while the video request is rinning. */}
      {loading && (<div className='loading-section'> <div className='loading-title'> <Oval width={27} height={27} strokeWidth={5} visible={true} color="white" secondaryColor="rgb(79, 77, 77)" /><h1>Loading...</h1></div> </div>)}

      {/*Display an error message when the video request fails. */}
      {error && (<div className='error-section'> <div className='error-title'><h1>Some thing went wrong...</h1></div> </div>)}

      {/*Display a loader while the assignment request is rinning. */}
      {assignmentLoading && (<div className='loading-section'> <div className='loading-title'> <Oval width={27} height={27} strokeWidth={5} visible={true} color="white" secondaryColor="rgb(79, 77, 77)" /><h1>Loading...</h1></div> </div>)}

      {/*Display an error message when the assignment request fails. */}
      {assignmentError && (<div className='error-section'> <div className='error-title'><h1>Some thing went wrong...</h1></div> </div>)}

      {/*Provide forms to upload or update videos and assignments. */}
      <div className='manage-course-content-section' ref={scrollRef}  >
        <h1>Create Course</h1>

        <div className='manage-course-content-input-field-maincontainer'>

          {/*Video upload form. */}
          <form onSubmit={submitData} >

            <div className='manage-course-content-input-field-section'>

              {/*Video title input field. */}
              <div className='manage-course-input-section'>
                <h1>Video Title</h1>
                <input type="text"
                  placeholder='Enter Title'
                  className={empty && !videoTitle ? "manage-course-invalid-input-field" : "manage-course-input-field"}
                  value={videoTitle}
                  onChange={(e) => setVideoTitle(e.target.value)}
                />
              </div>

              <div className='manage-course-file-input-section'>
                <h1>Choose Video</h1>

                <div className={empty && !video ? "manage-course-file-invalid-input-field-section" : "manage-course-file-input-field-section"}>

                  {/*Select a video file input field. */}
                  <input type="file"
                    accept="video/*"
                    className='manage-course-file-input-field'
                    onChange={(e) => setVideo(e.target.files[0])}
                  />

                </div>

              </div>
              {/*Show upload or update button. */}
              <div className='manage-course-upload-button-section'>
                <button className='manage-course-upload-button' > {editVideoindux !== null ? "Update Video" : "Upload Video"} </button>
              </div>


            </div>
          </form>

          {/*Assignment upload form. */}
          <form onSubmit={uploadAssigment} >

            <div className='manage-course-content-input-field-section'>

              {/*Assignment title input field. */}
              <div className='manage-course-input-section'>
                <h1>Assignment Title</h1>
                <input type="text"
                  placeholder='Enter Title'
                  className={emptyForm && !assignmentTitle ? "manage-course-invalid-input-field" : "manage-course-input-field"}
                  value={assignmentTitle}
                  onChange={(e) => setAssignmentTitle(e.target.value)}
                />
              </div>

              <div className='manage-course-file-input-section'>
                <h1>Choose Assignment</h1>

                <div className={emptyForm && !assignment ? "manage-course-file-invalid-input-field-section" : "manage-course-file-input-field-section"}>

                  {/*Assignment file input filed. */}
                  <input type="file"
                    accept=".doc,.docx,.pdf"
                    className='manage-course-file-input-field'
                    onChange={(e) => setAssignment(e.target.files[0])}
                  />

                </div>

              </div>

              {/*Show upload or update button. */}
              <div className='manage-course-upload-button-section'>
                <button className='manage-course-upload-button' > {editAssignmentindux !== null ? "Update Assignment" : "Upload Assignment"} </button>
              </div>


            </div>
          </form>
        </div>
      </div>

      {/*Display course content. */}
      <div className='manage-course-data-section'>
        <h1> Course Content</h1>
        <div className='manage-course-data'>

          {/*Open or close the sidebar. */}
          <div className={!slider ? 'manage-course-list-slider-open' : 'manage-course-list-slider-close'}>

            <button onClick={() => setSlider(!slider)} className='manage-course-list-slider-button'>{!slider ? <FaTimes /> : <FaBars />}</button>
            {/*Show the uploaded content list. */}
            <div className={courseList.length === 0 ? 'manage-course-list-no-titles-section' : 'manage-course-list-titles-section'}>

              {courseList.length === 0 ? (<h3> No Uploads yet </h3>) : (<div className='manage-course-list-titles-maincontainer'>{courseList} </div>)}

            </div>
          </div>

          <div className='manage-course-data-display-maincontainer'>
            {/*Show the selected video or assignment. */}
            {
              selectContent?.type === "videos" ? (
                <div className='manage-course-data-video-section'>
                  {/*Play the selected video. */}
                  <video src={selectContent.data.videoUrl}
                    controls
                    width='100%' height='100%'
                    controlsList='nodownload'
                    onContextMenu={(e) => e.preventDefault()}
                    className='manage-course-data-video'
                  />

                  <div className='manage-course-data-video-title'>
                    <h1>{selectContent.data.title}</h1>
                  </div>
                </div>
              ) : selectContent?.type === "assignment" ? (
                <div className='manage-course-data-assignment-section'>
                  <h1>Assignment Instructions</h1>
                  <div className='manage-course-data-assignment-title-section'>
                    <p>{selectContent.data.title}</p>

                    <div className='manage-course-data-assignment'>
                      {/*Open the assignment file. */}
                      <a href={selectContent.data.fileUrl} className='manage-course-data-assignment-link'>open assignment</a>
                    </div>

                  </div>
                </div>
              ) : (
                //Show a message if nothing is selected.
                <div className='manage-course-no-data-section'>
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

export default ManageCourse
