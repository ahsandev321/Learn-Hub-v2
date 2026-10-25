import React, { useEffect, useState } from 'react'
import axios from 'axios'

function UseMycourses() {

    //Store the loading state.
    const [loading, setLoading] = useState(false);

    //Store the error state.
    const [error, setError] = useState(false);

    const [myCourse, setMyCoures] = useState([])

    //Fetch the student's courses when the component loads.
    useEffect(() => {

        (async () => {

            try {

                setLoading(true)
                setError(false)

                const studentId = localStorage.getItem("userId")

                if (!studentId) {
                    setLoading(false)
                    return
                }

                const token = localStorage.getItem("token")

                //Get the courses linked to the student.
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/student-courses?studentId=${studentId}`, { headers: { Authorization: `Bearer ${token}` } })

                setMyCoures(res.data.courses)

                setLoading(false)

            } catch (error) {

                setError(true)
                setLoading(false)



            }


        })()
    }, [])


    //Return the courses data and request status.
    return {
        loading,
        error,
        myCourse

    }
}

export default UseMycourses
