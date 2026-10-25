import React, { useEffect, useState } from 'react'
import axios from 'axios'
function UseAdminDashboard({ messageindux, instructorId, studentindux, teacherCourses, coursesindux, setCoursesindux }) {

    //Manage loading and error states.
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const [status, setStatus] = useState([])

    const [students, setStudents] = useState([])
    const [teachers, setTeachers] = useState([])
    const [courses, setCourses] = useState([])
    const [messages, setMessages] = useState([])

    //Fetch dashboard data when the component loads.
    useEffect(() => {

        (async () => {

            try {

                setLoading(true)

                setError(false)

                const token = localStorage.getItem("token")

                const res = await axios.get(`${process.env.REACT_APP_API_URL}/admin-details`, { headers: { Authorization: `Bearer ${token}` } })

                setStatus(res.data.details)

                const allstudent = await axios.get(`${process.env.REACT_APP_API_URL}/admin-get-users`, { headers: { Authorization: `Bearer ${token}` } })

                setStudents(allstudent.data.allstudent)

                const allteacher = await axios.get(`${process.env.REACT_APP_API_URL}/admin-get-users`, { headers: { Authorization: `Bearer ${token}` } })

                setTeachers(allteacher.data.allteacher)


                const contactUsMessages = await axios.get(`${process.env.REACT_APP_API_URL}/admin-contact-us-data`, { headers: { Authorization: `Bearer ${token}` } })

                setMessages(contactUsMessages.data.contactUsData)



                setLoading(false)

            } catch (error) {

                setError(true)
                setLoading(false)



            }


        })()
    }, [])

    //Fetch the selected teacher's courses.
    useEffect(() => {

        if (!teacherCourses) return;

        (async () => {

            try {

                setLoading(true)

                setError(false)

                const token = localStorage.getItem("token")


                const teacherCoursesData = await axios.get(`${process.env.REACT_APP_API_URL}/admin-get-instructor-data/${teacherCourses}`, { headers: { Authorization: `Bearer ${token}` } })

                setCourses(teacherCoursesData.data.data.courses)

                const res = await axios.get(`${process.env.REACT_APP_API_URL}/admin-details`, { headers: { Authorization: `Bearer ${token}` } })

                setStatus(res.data.details)

                const allstudent = await axios.get(`h${process.env.REACT_APP_API_URL}/admin-get-users`, { headers: { Authorization: `Bearer ${token}` } })

                setStudents(allstudent.data.allstudent)

                const allteacher = await axios.get(`${process.env.REACT_APP_API_URL}/admin-get-users`, { headers: { Authorization: `Bearer ${token}` } })

                setTeachers(allteacher.data.allteacher)


                setLoading(false)

            } catch (error) {

                setError(true)
                setLoading(false)



            }


        })()
    }, [teacherCourses])

    //Mark all contact us messages as read.
    const markMessageAsRead = () => {



        (async () => {

            try {

                setLoading(true)

                setError(false)

                const token = localStorage.getItem("token")


                await axios.put(`${process.env.REACT_APP_API_URL}/admin-contact-us-data/mark-read`, {}, { headers: { Authorization: `Bearer ${token}` } })

                const updateMessage = messages.map((messages) => ({
                    ...messages,
                    isRead: true
                }))
                setMessages(updateMessage)



                setLoading(false)

            } catch (error) {

                setError(true)
                setLoading(false)



            }


        })()
    }



    //Delet the selected course and refresh dashboard data.
    useEffect(() => {

        if (!coursesindux) return;

        (async () => {

            try {

                setLoading(true)

                setError(false)

                const token = localStorage.getItem("token")


                await axios.delete(`${process.env.REACT_APP_API_URL}/course/${coursesindux}`, { headers: { Authorization: `Bearer ${token}` } })

                setCoursesindux(null)

                const teacherCoursesData = await axios.get(`${process.env.REACT_APP_API_URL}/admin-get-instructor-data/${teacherCourses}`, { headers: { Authorization: `Bearer ${token}` } })

                setCourses(teacherCoursesData.data.data.courses)


                const res = await axios.get(`${process.env.REACT_APP_API_URL}/admin-details`, { headers: { Authorization: `Bearer ${token}` } })

                setStatus(res.data.details)

                const allstudent = await axios.get(`${process.env.REACT_APP_API_URL}/admin-get-users`, { headers: { Authorization: `Bearer ${token}` } })

                setStudents(allstudent.data.allstudent)

                const allteacher = await axios.get(`${process.env.REACT_APP_API_URL}/admin-get-users`, { headers: { Authorization: `Bearer ${token}` } })

                setTeachers(allteacher.data.allteacher)



                setLoading(false)

            } catch (error) {

                setError(true)
                setLoading(false)



            }


        })()
    }, [coursesindux])


    //Delete the selected teacher and refresh dashboard data.
    useEffect(() => {

        if (!instructorId) return;

        (async () => {

            try {

                setLoading(true)

                setError(false)

                const token = localStorage.getItem("token")


                await axios.delete(`${process.env.REACT_APP_API_URL}/instructor/${instructorId}`, { headers: { Authorization: `Bearer ${token}` } })


                const res = await axios.get(`${process.env.REACT_APP_API_URL}/admin-details`, { headers: { Authorization: `Bearer ${token}` } })

                setStatus(res.data.details)

                const allstudent = await axios.get(`${process.env.REACT_APP_API_URL}/admin-get-users`, { headers: { Authorization: `Bearer ${token}` } })

                setStudents(allstudent.data.allstudent)

                const allteacher = await axios.get(`${process.env.REACT_APP_API_URL}/admin-get-users`, { headers: { Authorization: `Bearer ${token}` } })

                setTeachers(allteacher.data.allteacher)



                setLoading(false)

            } catch (error) {

                setError(true)
                setLoading(false)



            }


        })()
    }, [instructorId])


    //Delete the selected student and refresh dashboard data.
    useEffect(() => {

        if (!studentindux) return;

        (async () => {

            try {

                setLoading(true)

                setError(false)

                const token = localStorage.getItem("token")


                await axios.delete(`${process.env.REACT_APP_API_URL}/student/${studentindux}`, { headers: { Authorization: `Bearer ${token}` } })


                const res = await axios.get(`${process.env.REACT_APP_API_URL}/admin-details`, { headers: { Authorization: `Bearer ${token}` } })

                setStatus(res.data.details)

                const allstudent = await axios.get(`${process.env.REACT_APP_API_URL}/admin-get-users`, { headers: { Authorization: `Bearer ${token}` } })

                setStudents(allstudent.data.allstudent)

                const allteacher = await axios.get(`${process.env.REACT_APP_API_URL}/admin-get-users`, { headers: { Authorization: `Bearer ${token}` } })

                setTeachers(allteacher.data.allteacher)



                setLoading(false)

            } catch (error) {

                setError(true)
                setLoading(false)



            }


        })()
    }, [studentindux])

    //Delete the selected message and refresh the message list.
    useEffect(() => {

        if (!messageindux) return;

        (async () => {

            try {

                setLoading(true)

                setError(false)

                const token = localStorage.getItem("token")


                await axios.delete(`${process.env.REACT_APP_API_URL}/admin-contact-us-data/${messageindux}`, { headers: { Authorization: `Bearer ${token}` } })



                const contactUsMessages = await axios.get(`${process.env.REACT_APP_API_URL}/admin-contact-us-data`, { headers: { Authorization: `Bearer ${token}` } })

                setMessages(contactUsMessages.data.contactUsData)




                setLoading(false)

            } catch (error) {

                setError(true)
                setLoading(false)



            }


        })()
    }, [messageindux])

    //Return dashboard data and message actions.
    return {
        loading,
        error,
        messages,
        status,
        students,
        teachers,
        courses,
        markMessageAsRead

    }
}

export default UseAdminDashboard
