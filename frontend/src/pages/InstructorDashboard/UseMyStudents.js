import React, { useEffect, useState } from 'react'
import axios from 'axios'

function UseMyStudents({ deleteindux, readAssignments }) {

    //Manage API status and dashboard data.
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const [students, setStudents] = useState([])

    const [myCourses, setMycoures] = useState([])

    const [unreadAssignments, setUnreadAssignments] = useState([])

    //Fatch instructor course, students, and unread assignments.
    useEffect(() => {
        (async () => {

            try {

                setLoading(true)
                setError(false)

                
                const token = localStorage.getItem("token")

                const instructorId = localStorage.getItem("userId")

                const unReadres = await axios.get(`http://localhost:3000/unread-assignments?instructorId=${instructorId}`, { headers: { Authorization: `Bearer ${token}` } })

                setUnreadAssignments(unReadres.data.unreadAssignments)

                const studentres = await axios.get(`http://localhost:3000/my-students?instructorId=${instructorId}`, { headers: { Authorization: `Bearer ${token}` } })

                setStudents(studentres.data.students)

                const userId = localStorage.getItem("userId")

                const coursesres = await axios.get(`http://localhost:3000/my-courses?userId=${userId}`, { headers: { Authorization: `Bearer ${token}` } })

                setMycoures(coursesres.data)

                setLoading(false)

            } catch (error) {

                setError(true)
                setLoading(false)

            }


        })()
    }, [])

    //Mark a student's assignents as read.
    useEffect(() => {

        if (!readAssignments) return;

        (async () => {

            try {

                setLoading(true)
                setError(false)

                
                const token = localStorage.getItem("token")

                await axios.put(`http://localhost:3000/read-assignments/${readAssignments.studentId}`, {}, { headers: { Authorization: `Bearer ${token}` } })


                setLoading(false)

            } catch (error) {

                setError(true)
                setLoading(false)

            }


        })()
    }, [readAssignments])

    //Remove a student and their related course records.
    useEffect(() => {

        if (!deleteindux) return;

        (async () => {

            try {

                setLoading(true)
                setError(false)

                
                const token = localStorage.getItem("token")

                await axios.delete(`http://localhost:3000/remove-students/${deleteindux.studentId}/${deleteindux.courseId}`, { headers: { Authorization: `Bearer ${token}` } })

                await axios.delete(`http://localhost:3000/delete-assignments/${deleteindux.studentId}/${deleteindux.courseId}`, { headers: { Authorization: `Bearer ${token}` } })

                await axios.delete(`http://localhost:3000/delete-content-viewed/${deleteindux.studentId}/${deleteindux.courseId}`, { headers: { Authorization: `Bearer ${token}` } })

                //Refresh the student list after deletion.
                const instructorId = localStorage.getItem("userId")

                const studentres = await axios.get(`http://localhost:3000/my-students?instructorId=${instructorId}`, { headers: { Authorization: `Bearer ${token}` } })

                setStudents(studentres.data.students)


                setLoading(false)

            } catch (error) {

                setError(true)
                setLoading(false)

            }


        })()
    }, [deleteindux])

    //Expose dashboard data and API status to the components.
    return {
        loading,
        error,
        students,
        myCourses,
        unreadAssignments

    }
}

export default UseMyStudents
