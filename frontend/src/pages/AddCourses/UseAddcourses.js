import axios from 'axios';
import React, { useEffect, useState } from 'react'

function UseAddcourses({ courseData, editindux, setEditindux, deleteindux, setDeleteindux, courseEditData }) {


    //Manage loading and error states.
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const [myCourse, setMycoures] = useState([])


    //Fetch the teacher's courses when the hook first loads.
    useEffect(() => {

        (async () => {

            try {

                setLoading(true)

                setError(false)

                const userId = localStorage.getItem("userId")
                const res = await axios.get(`http://localhost:3000/courses?userId=${userId}`)

                setMycoures(res.data)

                setLoading(false)

            } catch (error) {

                setError(true)
                setLoading(false)



            }


        })()
    }, [])

    //Create a new course and refresh the course list.
    useEffect(() => {

        if (!courseData) return;

        (async () => {

            try {

                //Show the loading screen.
                setLoading(true)

                //Reset any previous error.
                setError(false)

                await axios.post("http://localhost:3000/courses", courseData)

                const userId = localStorage.getItem("userId")
                const res = await axios.get(`http://localhost:3000/courses?userId=${userId}`)

                setMycoures(res.data)

                //Hide the loading screen.
                setLoading(false)

            } catch (error) {

                //Reset any previous error.
                setError(true)
                setLoading(false)



            }


        })()
    }, [courseData])

    //Update an existing course and refresh the course list.
    useEffect(() => {

        if (!courseEditData) return;

        (async () => {

            try {

                //Show the loading screen.
                setLoading(true)

                //Reset any previous error.
                setError(false)

                await axios.put(`http://localhost:3000/courses/${editindux}`, courseEditData)

                setEditindux(null)

                const userId = localStorage.getItem("userId")
                const res = await axios.get(`http://localhost:3000/courses?userId=${userId}`)

                setMycoures(res.data)


                //Hide the loading screen.
                setLoading(false)

            } catch (error) {

                //Reset any previous error.
                setError(true)
                setLoading(false)



            }


        })()
    }, [courseEditData])

    //Delete a course and refresh the course list.
    useEffect(() => {

        if (!deleteindux) return;

        (async () => {

            try {

                //Show the loading screen.
                setLoading(true)

                //Reset any previous error.
                setError(false)

                await axios.delete(`http://localhost:3000/courses/${deleteindux}`)

                setDeleteindux(null)

                const userId = localStorage.getItem("userId")
                const res = await axios.get(`http://localhost:3000/courses?userId=${userId}`)

                setMycoures(res.data)

                //Hide the loading screen.
                setLoading(false)

            } catch (error) {

                //Reset any previous error.
                setError(true)
                setLoading(false)



            }


        })()
    }, [deleteindux])

    //Return th ecourse data and API statu to the component.
    return {
        loading,
        error,
        myCourse
    }


}

export default UseAddcourses
