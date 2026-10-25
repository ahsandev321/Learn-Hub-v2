import axios from 'axios';
import React, { useEffect, useState } from 'react'

function UseManageCourse({ courseData, deleteindux, editVideo, editVideoindux, setEditVideoindux, setDeleteindux }) {
    // Store the loading state.
    const [loading, setLoading] = useState(false);

    //Store the error state.
    const [error, setError] = useState(false);

    const [coursedata, setCoursedata] = useState([])


    //Fetch course videos on component mount.
    useEffect(() => {

        (async () => {


            try {

                setLoading(true)
                setError(false)

                const token = localStorage.getItem("token")

                const courseId = localStorage.getItem("courseId")

                const res = await axios.get(`http://localhost:3000/videos?courseId=${courseId}`, { headers: { Authorization: `Bearer ${token}` } })

                setCoursedata(res.data.data)

                setLoading(false)

            } catch (error) {

                setError(true)
                setLoading(false)



            }


        })()
    }, [])

    //Create a new course video.
    useEffect(() => {

        if (!courseData) return;

        (async () => {


            try {

                setLoading(true)
                setError(false)

                const token = localStorage.getItem("token")

                await axios.post("http://localhost:3000/videos", courseData, { headers: { Authorization: `Bearer ${token}` } })

                const courseId = localStorage.getItem("courseId")

                const res = await axios.get(`http://localhost:3000/videos?courseId=${courseId}`, { headers: { Authorization: `Bearer ${token}` } })

                setCoursedata(res.data.data)



                setLoading(false)

            } catch (error) {

                setError(true)
                setLoading(false)



            }


        })()
    }, [courseData])

    //Update an existing course video.
    useEffect(() => {

        if (!editVideo) return;

        (async () => {


            try {

                setLoading(true)
                setError(false)

                const token = localStorage.getItem("token")

                await axios.put(`http://localhost:3000/videos/${editVideoindux}`, editVideo, { headers: { Authorization: `Bearer ${token}` } })

                setEditVideoindux(null)

                const courseId = localStorage.getItem("courseId")

                const res = await axios.get(`http://localhost:3000/videos?courseId=${courseId}`, { headers: { Authorization: `Bearer ${token}` } })

                setCoursedata(res.data.data)



                setLoading(false)

            } catch (error) {

                setError(true)
                setLoading(false)



            }


        })()




    }, [editVideo])

    //Delete the selected course video.
    useEffect(() => {

        if (deleteindux?.contentType !== 'videos') return;

        (async () => {


            try {

                setLoading(true)
                setError(false)

                const token = localStorage.getItem("token")

                await axios.delete(`http://localhost:3000/videos/${deleteindux._id}`, { headers: { Authorization: `Bearer ${token}` } })

                setDeleteindux(null)

                const courseId = localStorage.getItem("courseId")

                const res = await axios.get(`http://localhost:3000/videos?courseId=${courseId}`, { headers: { Authorization: `Bearer ${token}` } })

                setCoursedata(res.data.data)



                setLoading(false)

            } catch (error) {

                setError(true)
                setLoading(false)



            }


        })()




    }, [deleteindux])


    //Expose course state and data.
    return {
        loading,
        error,
        coursedata
    }

}

export default UseManageCourse
