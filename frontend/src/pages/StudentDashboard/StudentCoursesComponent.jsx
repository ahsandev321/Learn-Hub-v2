import React from 'react'
import { FaCircle } from 'react-icons/fa'

function StudentCoursesComponent({ data, selectContent, setSelectContent, viewContent, isviewed }) {
  return (
    <div>
      {/*Course content list items. */}
      <div className='student-course-list-titles-content-section'>

        <button
          className={selectContent?.data._id === data._id ? 'student-course-list-active-button' : 'student-course-list-button'}
          key={data._id}
          onClick={() => {

            //Set the selected course content.
            setSelectContent({
              type: data.contentType,
              data: data
            })

            //Update the content view status.
            viewContent(data)

          }}
        >
          {/*Show an icon for new content. */}
          <h2>{isviewed ? ("") : (<FaCircle className='student-course-list-new-contetn-icon' />)} {data.title}</h2>
        </button>
        <hr />

      </div>
    </div>
  )
}

export default StudentCoursesComponent
