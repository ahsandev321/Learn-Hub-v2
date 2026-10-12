import React, { useEffect, useRef, useState } from 'react'
import './CourseCards.css'


function Allcourses({ data, text, handleBuy, handleOpen }) {

    //Store the description show/hide state.
    const [discription, setDiscription] = useState(false)

    //Get a reference to the description section.
    const descriptionRef = useRef(null);


    //Close the description when clicking outside it.
    useEffect(() => {
        const handleClickEffect = (e) => {

            if (descriptionRef.current && !descriptionRef.current.contains(e.target)) {
                setDiscription(false)
            }

        }
        //Add a click event listener.
        window.addEventListener("click", handleClickEffect)

        //Remove the event listener when the component unmounts.
        return () => {
            window.removeEventListener("click", handleClickEffect)
        }


    }, [])



    return (

        <div className='allcourses-card-maincontainer'>

            {/*Show the course thumbnail. */}
            <div className='allcourses-card-imag-section'>
                <img src={data.thumbnail}
                    className='allcourses-card-imag'
                    width='100%'
                    height="100%"
                    alt={data.title} />
            </div>

            {/*Show the website logo. */}
            <div className='add-courses-card-logo-section' >
                <h1> <span className='allcourses-logo-text'>Learn</span>Hub</h1>
            </div>

            {/*Show the course title. */}
            <div className='allcourses-card-text-heading-section'>
                <h2>{data.title}</h2>
            </div>

            {/*show the course description with more amd less options. */}
            <div className='allcourses-card-text-heading-section' ref={descriptionRef}>
                <div className={!discription ? 'allcourses-card-text-less-content-section' : "allcourses-card-text-more-content-section"}>
                    <p>{data.description}</p>
                </div>

                {/*Toggle the description visibility. */}
                <button className='allcourses-card-show-more-text-button'
                    onClick={(e) => setDiscription(!discription)}>{!discription ? '  more' : '  less'}
                </button>
            </div>

            {/*Show the course caregory. */}
            <div className='allcourses-card-text-section'>
                <h3>{data.category}</h3>
            </div>

            {/*Show the course price. */}
            <div className='allcourses-card-text-section'>
                <h3>${data.price}</h3>
            </div>

            {/*Handel the course action button. */}
            <div className='allcourses-card-button-section'>

                <button className='allcourses-card-button' onClick={() => text === "Open" ? handleOpen(data) : handleBuy(data)}  > {text} </button>
            </div>


        </div>





    )
}

export default Allcourses
