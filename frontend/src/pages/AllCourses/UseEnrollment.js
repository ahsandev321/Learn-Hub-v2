import React, { useEffect, useState } from 'react'
import axios from 'axios';


function UseEnrollment({ enrolledData }) {


    //Manage enrollment loading, error, and result states.
    const [enrolledLoading, setEnrolledLoading] = useState(false);
    const [enrollederror, setEnrollederror] = useState(false);
    const [alreadyEnrolled, setAlreadyEnrolled] = useState(false);
    const [enrolled, setEnrolled] = useState(false);



    //Enrollment the student when enrollment data is available.
    useEffect(() => {

        if (!enrolledData) return;
        (async () => {

            try {

                setEnrolledLoading(true)
                setEnrollederror(false)


                const token = localStorage.getItem("token")

                const res = await axios.post("http://localhost:3000/enroll-free", enrolledData, { headers: { Authorization: `Bearer ${token}` } })


                //Store the enrollment result returned by the API.
                setAlreadyEnrolled(res.data.Enrolled)
                setEnrolled(res.data.success)


                setEnrolledLoading(false)

            } catch (error) {

                setEnrollederror(true)
                setEnrolledLoading(false)



            }


        })()
    }, [enrolledData])


    //Return enrollments status and state controls.
    return {
        enrolledLoading,
        enrollederror,
        alreadyEnrolled,
        enrolled,
        setAlreadyEnrolled,
        setEnrolled

    }
}



export default UseEnrollment
