import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Interceptor() {

    const navigate = useNavigate()

    //Handel API response and authentication error.
    useEffect(() => {

        const interceptorId = axios.interceptors.response.use(
            (response) => {
                return response
            },
            (error) => {

                // Lougout the user when authentication fails.
                if (error.response?.status === 401 && !error.config?.url?.includes("/login")) {

                    localStorage.removeItem("login")
                    localStorage.removeItem("role")
                    localStorage.removeItem("userId")
                    localStorage.removeItem("myCourses")
                    localStorage.removeItem("courseId")
                    localStorage.removeItem("myCourseId")
                    localStorage.removeItem("selectedStudentId")
                    localStorage.removeItem("token")

                    //Redirect the user to the login page.
                    navigate('/login', { replace: true })

                    //Notify other components about the login status change.
                    window.dispatchEvent(new Event("loginChanged"))

                }

                return Promise.reject(error)
            }


        )

        //Clean up the interceptors to prevent duplicate registration.
        return () => {
            axios.interceptors.response.eject(interceptorId)

        }

    }, [navigate]


    )

    return null


}

export default Interceptor
