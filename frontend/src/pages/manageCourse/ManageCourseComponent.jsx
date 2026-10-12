import React, { useEffect, useRef, useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'

function ManageCourseComponent({ data, setSelectContent, selectContent, deleteData, editData }) {

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

        <div className='manage-course-list-titles-content-section'>

            {/*Select course content. */}
            <button
                className={selectContent?.data._id === data._id ? 'manage-course-list-active-button' : 'manage-course-list-button'}
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
                className='manage-course-list-more-option-button'
                onClick={(e) => setOption(!option)}> <BsThreeDotsVertical /> </button>

            {/*Show Edit and Delete options. */}
            {option && (
                <div className='manage-course-list-more-option-section'>
                    <div className='manage-course-list-option-button-section'>
                        <button className='manage-course-list-option-button' onClick={() => editData(data)} >Edit</button>
                    </div>
                    <hr />
                    <div className='manage-course-list-option-button-section'>
                        <button className='manage-course-list-option-button' onClick={() => deleteData(data)} >Delete</button>
                    </div>
                </div>
            )}


        </div>

    )
}

export default ManageCourseComponent
