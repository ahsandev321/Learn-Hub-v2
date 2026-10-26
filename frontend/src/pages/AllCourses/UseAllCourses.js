import React, { useEffect, useState } from 'react'
import axios from 'axios';
function UseAllCourses() {

    //Manage loading, error, and courses data.
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const [course, setcoures] = useState([])

    //Fetch all courses when the hook first loads.
    useEffect(() => {

        (async () => {

            try {

                setLoading(true)
                setError(false)

                const res = await axios.get(`${process.env.REACT_APP_API_URL}/courses`)

                setcoures(res.data)

                setLoading(false)

            } catch (error) {

                setError(true)
                setLoading(false)



            }

        })()
    }, [])

    //Return the course data and API status.
    return {
        loading,
        error,
        course

    }
}

export default UseAllCourses
