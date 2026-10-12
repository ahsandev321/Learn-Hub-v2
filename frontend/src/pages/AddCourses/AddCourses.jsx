import React, { useEffect, useRef, useState } from 'react'
import './AddCourses.css'
import TeacherDashboardMenue from '../../components/TeacherDashboardMenue/TeacherDashboardMenue'
import UseAddcourses from './UseAddcourses'
import { Oval } from 'react-loader-spinner'
import AddCoursesComponent from './AddCoursesComponent'
function AddCourses() {

    //Store the courses form fiels values.
    const [courseImage, setCourseImage] = useState(null)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")
    const [price, setPrice] = useState("")

    //track form valifation errrors.
    const [empty, setEmpty] = useState(false)

    //Store the ID of the course begin edited or deleted.
    const [editindux, setEditindux] = useState(null)
    const [deleteindux, setDeleteindux] = useState(null)

    //Store course data for create or updateing a course.
    const [courseData, setCourseData] = useState(null)
    const [courseEditData, setCourseEditData] = useState(null)

    //Handle course API operations and retrieve the teacher's course.
    const { loading, error, myCourse } = UseAddcourses({ courseData, courseEditData, editindux, setEditindux, deleteindux, setDeleteindux })

    //Update local storage when the course list changes.
    useEffect(() => {

        if (myCourse.length > 0) {

            localStorage.setItem("myCourses", "true")

        } else {

            localStorage.removeItem("myCourses")
        }

    }, [myCourse])

    //Create a reference for scrolling tp the course form.
    const scrollRef = useRef(null)

    //Set the course ID when the teacher deletes a course.
    const deleteData = (dataId) => {

        setDeleteindux(dataId)
    }

    //Load the selected course data into the form for editing.
    const editData = (dataId, data) => {

        setCourseImage(null)
        setTitle(data.title)
        setDescription(data.description)
        setCategory(data.category)
        setPrice(data.price)

        //Store the selected course ID for the update operation.
        setEditindux(dataId)

        //Scroll smoothly to the course form.
        scrollRef.current?.scrollIntoView({
            behavior: "smooth"
        })

    }

    //render a course card for each course.
    const coursesCard = myCourse.map((myCourse) => {
        return (
            <AddCoursesComponent
                key={myCourse._id}
                dataId={myCourse._id}
                editData={editData}
                deleteData={deleteData}
                data={myCourse}
            />
        )
    }
    )

    //Validate the form and prepare course data for submission.
    const uploadCourse = (e) => {
        e.preventDefault()

        //Enable validation message for empty or invalid fields.
        setEmpty(!empty)

        //Stop submission if required fields are mission or the price is negative.
        if (!courseImage || !title || !description || !category || !price) return
        if (price < 0) return

        //Get the current user's ID from local storage.
        const userId = localStorage.getItem("userId")

        //prepare course deatils and the thumbnail for the API request.
        const formData = new FormData()

        formData.append('title', title)
        formData.append('description', description)
        formData.append('category', category)
        formData.append('price', price)
        formData.append('userId', userId)
        formData.append('courseImage', courseImage)

        //Send thr form data for updateing or createing a course.
        if (editindux !== null) {

            setCourseEditData(formData)

        }
        else {
            setCourseData(formData)
        }

        //Reset the form fields after submission.
        setEmpty(false)
        setCourseImage(null)
        setTitle('')
        setDescription('')
        setCategory('')
        setPrice('')
    }

    return (
        <div className='add-courses-section-maincontainer' >

            {/*Show loading screen while API is working. */}
            {loading && (<div className='loading-section'> <div className='loading-title'> <Oval width={27} height={27} strokeWidth={5} visible={true} color="white" secondaryColor="rgb(79, 77, 77)" /><h1>Loading...</h1></div> </div>)}

            {/*Show loading screen while API is working. */}
            {error && (<div className='error-section'> <div className='error-title'><h1>Some thing went wrong...</h1></div> </div>)}


            {/*Display the teacher dashboard navigation menue. */}
            <TeacherDashboardMenue />

            <div className='add-courses-content-section' ref={scrollRef} >
                <div className='add-courses-content'>
                    <h1>Add New Courses</h1>
                </div>

                {/*Course form for uploading a new course or updating an existing one. */}
                <div className='add-courses-fields-maincontainer'>

                    <form onSubmit={uploadCourse}  >
                        <div className='add-courses-file-input-section'>
                            <h1>Course Thumbnail</h1>

                            {/*Highlight the image fields if no image is selected. */}
                            <div className={empty && !courseImage ? "add-courses-file-invalid-input-field-section" : "add-courses-file-input-field-section"}>


                                <input type="file"
                                    accept="image/*"
                                    className='add-courses-file-input-field'
                                    onChange={(e) => setCourseImage(e.target.files[0])}
                                />

                            </div>

                        </div>

                        {/*Course details input fields with validation styling. */}
                        <div className='add-courses-input-fields-section'>
                            <div className='add-courses-input-section'>
                                <h1>Title</h1>
                                <input type="text"
                                    placeholder='Enter Title'
                                    className={empty && !title ? "add-courses-invalid-input-field" : "add-courses-input-field"}
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>

                            <div className='add-courses-input-section'>
                                <h1>Description</h1>
                                <input type="text"
                                    placeholder='Enter Description'
                                    className={empty && !description ? "add-courses-invalid-input-field" : "add-courses-input-field"}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>

                            <div className='add-courses-input-section'>
                                <h1>Category</h1>
                                <input type="text"
                                    placeholder='Enter Category'
                                    className={empty && !category ? "add-courses-invalid-input-field" : "add-courses-input-field"}
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                />
                            </div>

                            <div className='add-courses-input-section'>
                                <h1>Price</h1>
                                <input type="number"
                                    placeholder='Enter Price'
                                    className={empty && (!price || price < 0) ? "add-courses-invalid-input-field" : "add-courses-input-field"}
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>

                        </div>

                        {/*Change the button lable based on the current form mode. */}
                        <div className='add-courses-upload-button-section'>
                            <button className='add-courses-upload-button' >{editindux !== null ? "Update" : "Upload"}</button>
                        </div>


                    </form>

                </div>

                {/*Display the teacher's recently added courses. */}
                <div className='add-courses-card-section-maincontainer'>
                    <h1>MY Recent Courses</h1>

                    <div className={myCourse.length === 0 ? 'add-courses-nocard-section' : 'add-courses-card-section'}>

                        {/*Show an empty-state message when no courses exist. */}
                        {myCourse.length === 0 ? (
                            <div>
                                <h3>You have not added any courses yet</h3>
                            </div>
                        ) : (
                            coursesCard
                        )}

                    </div>
                </div>


            </div>


        </div>
    )
}

export default AddCourses
