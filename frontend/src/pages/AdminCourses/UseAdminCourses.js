import React, { useEffect, useState } from 'react'
import axios from 'axios'
function UseAdminCourses({ deleteindux, setDeleteindux }) {


    //Manage loading and error states.
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const [coursesData, setCoursesData] = useState({
        videos: [],
        assignments: []

    });

    //Fecth all course videos and assignments when the commponent mounts.
    useEffect(() => {

        (async () => {

            try {

                setLoading(true)

                setError(false)

                const token = localStorage.getItem("token")

                const courseId = localStorage.getItem("courseId")

                const teacherCoursesData = await axios.get(`${process.env.REACT_APP_API_URL}/admin-get-courses-data/${courseId}`, { headers: { Authorization: `Bearer ${token}` } })

                setCoursesData(teacherCoursesData.data.data)

                setLoading(false)

            } catch (error) {

                setError(true)
                setLoading(false)



            }


        })()
    }, [])

    //Delete the selected assignment aand refresh the course content.
    useEffect(() => {

        if (deleteindux?.contentType !== 'assignment') return;

        (async () => {

            try {

                setLoading(true)

                setError(false)

                const token = localStorage.getItem("token")

                const courseId = localStorage.getItem("courseId")

                await axios.delete(`${process.env.REACT_APP_API_URL}/admin-courses-assignment-data/${deleteindux._id}`, { headers: { Authorization: `Bearer ${token}` } })

                setDeleteindux(null)

                const teacherCoursesData = await axios.get(`${process.env.REACT_APP_API_URL}/admin-get-courses-data/${courseId}`, { headers: { Authorization: `Bearer ${token}` } })

                setCoursesData(teacherCoursesData.data.data)



                setLoading(false)

            } catch (error) {

                setError(true)
                setLoading(false)



            }


        })()
    }, [deleteindux])

    //Delete the selected video and refresh the course content.
    useEffect(() => {

        if (deleteindux?.contentType !== 'videos') return;

        (async () => {

            try {

                setLoading(true)

                setError(false)

                const token = localStorage.getItem("token")

                const courseId = localStorage.getItem("courseId")

                await axios.delete(`${process.env.REACT_APP_API_URL}/admin-courses-video-data/${deleteindux._id}`, { headers: { Authorization: `Bearer ${token}` } })

                setDeleteindux(null)

                const teacherCoursesData = await axios.get(`${process.env.REACT_APP_API_URL}/admin-get-courses-data/${courseId}`, { headers: { Authorization: `Bearer ${token}` } })

                setCoursesData(teacherCoursesData.data.data)



                setLoading(false)

            } catch (error) {

                setError(true)
                setLoading(false)



            }


        })()
    }, [deleteindux])




    return {
        loading,
        error,
        coursesData

    }
}

export default UseAdminCourses
