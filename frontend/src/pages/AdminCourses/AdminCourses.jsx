import React, { useState } from 'react'
import './AdminCourses.css'
import { Oval } from 'react-loader-spinner'
import { FaBars, FaTimes } from 'react-icons/fa'
import UseAdminCourses from './UseAdminCourses'
import AdminCoursesComponent from './AdminCoursesComponent'

function AdminCourses() {
 
   const [selectContent, setSelectContent] = useState(null)
 
   const [slider, setSlider] = useState(false)
 
   const [deleteindux, setDeleteindux] = useState(null)

   const{ loading, error, coursesData }=UseAdminCourses({deleteindux, setDeleteindux})
  
   //Combine and sort videos and assignments by date.
   const allContent = [
 
     ...coursesData.videos.map((videos) => ({
       ...videos,
       contentType: 'videos'
     })),
     ...coursesData.assignments.map((assignment) => ({
       ...assignment,
       contentType: 'assignment'
     })),
 
   ].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
 
   //Delete the selected content.
   const deleteData = (data) => {
     setDeleteindux(data)
     setSelectContent(null)
   }
 
   const courseList = allContent.map((data)=>(
       <AdminCoursesComponent 
        key={data._id}
        data={data}
        setSelectContent={setSelectContent}
        selectContent={selectContent}
        deleteData={deleteData}
       />
   ))
   
   return (
     <div className='admin-course-maincontainer'>
 
       {/*Display a loader while the video request is rinning. */}
       {loading && (<div className='loading-section'> <div className='loading-title'> <Oval width={27} height={27} strokeWidth={5} visible={true} color="white" secondaryColor="rgb(79, 77, 77)" /><h1>Loading...</h1></div> </div>)}
 
       {/*Display an error message when the video request fails. */}
       {error && (<div className='error-section'> <div className='error-title'><h1>Some thing went wrong...</h1></div> </div>)}
 
     
      
       {/*Display course content. */}
       <div className='admin-course-data-section'>
         <h1> Course Content</h1>
         <div className='admin-course-data'>
 
           {/*Open or close the sidebar. */}
           <div className={!slider ? 'admin-course-list-slider-open' : 'admin-course-list-slider-close'}>
 
             <button onClick={() => setSlider(!slider)} className='admin-course-list-slider-button'>{!slider ? <FaTimes /> : <FaBars />}</button>
             {/*Show the uploaded content list. */}
             <div className={courseList.length === 0 ? 'admin-course-list-no-titles-section' : 'admin-course-list-titles-section'}>
 
               {courseList.length === 0 ? (<h3> No Uploads yet </h3>) : (<div className='admin-course-list-titles-maincontainer'>{courseList} </div>)}
 
             </div>
           </div>
 
           <div className='admin-course-data-display-maincontainer'>
             {/*Show the selected video or assignment. */}
             {
               selectContent?.type === "videos" ? (
                 <div className='admin-course-data-video-section'>
                   {/*Play the selected video. */}
                   <video src={selectContent.data.videoUrl}
                     controls
                     width='100%' height='100%'
                     controlsList='nodownload'
                     onContextMenu={(e) => e.preventDefault()}
                     className='admin-course-data-video'
                   />
 
                   <div className='admin-course-data-video-title'>
                     <h1>{selectContent.data.title}</h1>
                   </div>
                 </div>
               ) : selectContent?.type === "assignment" ? (
                 <div className='admin-course-data-assignment-section'>
                   <h1>Assignment Instructions</h1>
                   <div className='admin-course-data-assignment-title-section'>
                     <p>{selectContent.data.title}</p>
 
                     <div className='admin-course-data-assignment'>
                       {/*Open the assignment file. */}
                       <a href={selectContent.data.fileUrl} className='admin-course-data-assignment-link'>open assignmet</a>
                     </div>
 
                   </div>
                 </div>
               ) : (
                 //Show a message if nothing is selected.
                 <div className='admin-course-no-data-section'>
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

export default AdminCourses
