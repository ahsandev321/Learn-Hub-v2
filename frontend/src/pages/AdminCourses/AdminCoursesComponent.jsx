import React, { useEffect, useRef, useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'


function AdminCoursesComponent({ data, setSelectContent, selectContent, deleteData}) {
   const [option, setOption] = useState(false)
 
     const optionRef = useRef(null);
 
     //Close option when click outside.
     useEffect(() => {
         const handelClickEffect = (e) => {
             if (optionRef.current && !optionRef.current.contains(e.target)) {
                 setOption(false)
             }
 
         }
 
         window.addEventListener("click", handelClickEffect)
 
         return () => {
             window.removeEventListener("click", handelClickEffect)
 
 
         }
     }, [])
 
     return (
 
         <div className='admin-course-list-titles-content-section'>
 
             {/*Select course content. */}
             <button
                 className={selectContent?.data._id === data._id ? 'admin-course-list-active-button' : 'admin-course-list-button'}
                 key={data._id}
                 onClick={() => setSelectContent({
                     type: data.contentType,
                     data: data
                 })}
             >
                 <h2> {data.title}</h2>
             </button>
             <hr />
 
             {/*Show more options. */}
             <button
                 ref={optionRef}
                 className='admin-course-list-more-option-button'
                 onClick={(e) => setOption(!option)}> <BsThreeDotsVertical /> </button>
 
             {/*Show Edit and Delete options. */}
             {option && (
                 <div className='admin-course-list-more-option-section'>
                     <div className='admin-course-list-option-button-section'>
                         <button className='admin-course-list-option-button' onClick={() => deleteData(data)} >Delete</button>
                     </div>
                 </div>
             )}
 
 
         </div>
 
     )
}

export default AdminCoursesComponent
