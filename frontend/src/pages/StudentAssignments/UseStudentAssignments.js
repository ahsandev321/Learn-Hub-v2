import React, { useEffect, useState } from 'react'
import axios from 'axios';

function UseStudentAssignments() {

    //Manage loading, error, and assignment data.
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const [assignments, setAssignments] = useState([])


    //Fetch student assignment on component mount.
    useEffect(() => {

        (async () => {


            try {

                setLoading(true)
                setError(false)

                const token = localStorage.getItem("token")

                const studentId = localStorage.getItem("selectedStudentId")

                const res = await axios.get(`http://localhost:3000/submit-assignment?studentId=${studentId}`, { headers: { Authorization: `Bearer ${token}` } })

                setAssignments(res.data.assignments)

                setLoading(false)

            } catch (error) {

                setError(true)
                setLoading(false)



            }


        })()
    }, [])

    //Return assignment data and request states.
    return {
        loading,
        error,
        assignments,

    }

}

export default UseStudentAssignments
