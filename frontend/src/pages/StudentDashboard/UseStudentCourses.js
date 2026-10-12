import React, { useEffect, useState } from 'react'
import axios from 'axios';

function UseStudentCourses({ assignment }) {

    //Store the loading state.
    const [loading, setLoading] = useState(false);
    //Store the error state.
    const [error, setError] = useState(false);

    const [isEnrolled, setIsEnrolled] = useState(true);

    const [videos, setVideos] = useState([])

    const [assignmets, setAssignmets] = useState([])

    const [studentAssignmet, setStudentAssignmet] = useState([])

    //Clear course data when access is not allowed.
    const clearCourseData = () => {
        setVideos([])
        setAssignmets([])
        setStudentAssignmet([])
        setIsEnrolled([])
    }

    //Fetch course data and check student enrollment.
    useEffect(() => {

        (async () => {

            try {

                setLoading(true)
                setError(false)

                const myCourseId = localStorage.getItem("myCourseId")

                const studentId = localStorage.getItem("userId")

                if (!myCourseId) {
                    setLoading(false)
                    return
                }

                //Check if the student is enrolled in this course.
                const enrollmentRes = await axios.get(`http://localhost:3000/my-courses?studentId=${studentId}`)

                const enrolled = enrollmentRes.data.courses.some((items) => items.courses?._id?.toString() === myCourseId.toString())

                setIsEnrolled(enrolled)

                if (!enrolled) {
                    setLoading(false)
                    return
                }

                //Fetch videos and assignments for the selected course.
                const videores = await axios.get(`http://localhost:3000/videos?courseId=${myCourseId}`)

                setVideos(videores.data.data)



                const assignmetres = await axios.get(`http://localhost:3000/assignments?courseId=${myCourseId}`)

                setAssignmets(assignmetres.data.data)


                //Fetch the student's submitted assignments.
                const res = await axios.get(`http://localhost:3000/submit-assignment?studentId=${studentId}`)

                setStudentAssignmet(res.data.assignments)





                setLoading(false)

            } catch (error) {

                setError(true)
                setLoading(false)



            }


        })()
    }, [])

    //Submit assignment and refresh the submission list/
    useEffect(() => {

        if (!assignment) return;

        (async () => {

            try {

                setLoading(true)
                setError(false)



                await axios.post("http://localhost:3000/submit-assignment", assignment)

                const studentId = localStorage.getItem("userId")

                const res = await axios.get(`http://localhost:3000/submit-assignment?studentId=${studentId}`)

                setStudentAssignmet(res.data.assignments)

                setLoading(false)

            } catch (error) {

                setError(true)
                setLoading(false)



            }


        })()
    }, [assignment])

    //Return course data, enrollment status, and actions.
    return {
        loading,
        error,
        videos,
        assignmets,
        studentAssignmet,
        isEnrolled,
        clearCourseData


    }
}

export default UseStudentCourses
