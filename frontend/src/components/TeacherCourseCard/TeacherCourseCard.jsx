import React, { useEffect, useRef, useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { NavLink } from 'react-router-dom'
import './TeacherCourseCard.css'


function TeacherCourseCard({ data, editData, dataId, deleteData }) {

    //Control the visibility of the course description.
    const [discription, setDiscription] = useState(false)

    //Control the visibility of the course options menu.
    const [option, setOption] = useState(false)

    //Create reference to detect click outside the menue and description.
    const optionRef = useRef(null);
    const descriptionRef = useRef(null);

    //Save the selected course ID for the course management page.
    const courseId = (dataId) => {
        localStorage.setItem("courseId", dataId)
    }

    //Close the menue and description when the user clicks outside them.
    useEffect(() => {
        const handelClickEffect = (e) => {
            //close the option menue if the click is outside its container.
            if (optionRef.current && !optionRef.current.contains(e.target)) {
                setOption(false)
            }
            //Collapse the description if the click is oudside its container.
            if (descriptionRef.current && !descriptionRef.current.contains(e.target)) {
                setDiscription(false)
            }
        }

        //Listen for clicks across the window.
        window.addEventListener("click", handelClickEffect)

        //Remove the event listeneer when the component unmounts.
        return () => {
            window.removeEventListener("click", handelClickEffect)


        }
    }, [])


    return (
        <div className='add-courses-card-maincontainer'>

            {/*Display the course thumbnail and use the title as alternative text. */}
            <div className='add-courses-card-imag-section'>
                <img src={data.thumbnail}
                    className='add-courses-card-imag'
                    width='100%'
                    height="100%"
                    alt={data.title} />
            </div>

            {/* Display the course brand and its options menue.*/}
            <div className='add-courses-card-logo-section' ref={optionRef}>

                <h1> <span className='add-courses-logo-text'>Learn</span>Hub</h1>

                {/*Toggle the menue when the user clicks the three-dot button. */}
                <button
                    className='add-courses-card-more-option-button'
                    onClick={(e) => setOption(!option)}> <BsThreeDotsVertical /> </button>
                {/*Show edit and delete actions when the menue is open. */}
                {option && (
                    <div className='add-courses-card-more-option-section'>
                        <div className='add-courses-card-option-button-section'>
                            <button className='add-courses-card-option-button' onClick={() => editData(dataId, data)} >Edit</button>
                        </div>
                        <hr />
                        <div className='add-courses-card-option-button-section'>
                            <button className='add-courses-card-option-button' onClick={() => deleteData(dataId)}>Delete</button>
                        </div>
                    </div>
                )}
            </div>

            {/* Display the course title.*/}
            <div className='add-courses-card-text-heading-section'>
                <h2>{data.title}</h2>
            </div>

            {/*Show a short or expanded version of the course description. */}
            <div className='add-courses-card-detail-section' ref={descriptionRef}>
                <div className={!discription ? 'add-courses-card-text-less-content-section' : "add-courses-card-text-more-content-section"}>
                    <p>{data.description}</p>
                </div>
                {/*Toggle between the full and shortened description. */}
                <button className='add-courses-card-show-more-text-button'
                    onClick={(e) => setDiscription(!discription)}>{!discription ? '  more' : '  less'}
                </button>
            </div>

            {/*Dispaly the course category and price. */}
            <div className='add-courses-card-text-section'>
                <h3>{data.category}</h3>
            </div>
            <div className='add-courses-card-text-section'>
                <h3>${data.price}</h3>
            </div>

            {/*Navigate to the course management page. */}
            <div className='add-courses-card-button-section'>

                <NavLink to='/manageCourse' className='add-courses-card-link' onClick={() => courseId(dataId)}>  <button className='add-courses-card-button'  > Open</button></NavLink>
            </div>


        </div>
    )
}

export default TeacherCourseCard
