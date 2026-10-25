import React, { useEffect, useState } from 'react'
import axios from 'axios'

function UseSettings({ updateName, updateEmail, updatePassword, setUpdateName, setUpdateEmail, setUpdatePassword }) {

    //Manage API status and dashboard data.
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [userData, setUserData] = useState(false)

    //Store password update status.
    const [passwordNotMatch, setPasswordNotMatch] = useState(false)
    const [passwordMatch, setPasswordMatch] = useState(false)

    //Fetch user data when the commponent loads.
    useEffect(() => {
        (async () => {

            try {

                setLoading(true)
                setError(false)


                const token = localStorage.getItem("token")

                const userId = localStorage.getItem("userId")

                const res = await axios.get(`http://localhost:3000/users-data/${userId}`, { headers: { Authorization: `Bearer ${token}` } })

                setUserData(res.data.user)

                setLoading(false)

            } catch (error) {

                setError(true)
                setLoading(false)

            }


        })()
    }, [])

    //Update the user's name.
    useEffect(() => {

        if (!updateName) return;

        (async () => {

            try {

                setLoading(true)
                setError(false)


                const token = localStorage.getItem("token")

                const userId = localStorage.getItem("userId")

                await axios.put(`http://localhost:3000/update-name/${userId}`, { updateName }, { headers: { Authorization: `Bearer ${token}` } })

                setUpdateName(null)

                const res = await axios.get(`http://localhost:3000/users-data/${userId}`, { headers: { Authorization: `Bearer ${token}` } })

                setUserData(res.data.user)

                setLoading(false)

            } catch (error) {

                setError(true)
                setLoading(false)

            }


        })()
    }, [updateName])

    //Update the user's email.
    useEffect(() => {

        if (!updateEmail) return;

        (async () => {

            try {

                setLoading(true)
                setError(false)


                const token = localStorage.getItem("token")

                const userId = localStorage.getItem("userId")

                await axios.put(`http://localhost:3000/update-email/${userId}`, { updateEmail }, { headers: { Authorization: `Bearer ${token}` } })

                setUpdateEmail(null)

                const res = await axios.get(`http://localhost:3000/users-data/${userId}`, { headers: { Authorization: `Bearer ${token}` } })

                setUserData(res.data.user)

                setLoading(false)

            } catch (error) {

                setError(true)
                setLoading(false)

            }


        })()
    }, [updateEmail])

    //Update the useer's password.
    useEffect(() => {

        if (!updatePassword) return;

        (async () => {

            try {

                setLoading(true)
                setError(false)


                const token = localStorage.getItem("token")

                const userId = localStorage.getItem("userId")

                const passwordres = await axios.put(`http://localhost:3000/update-password/${userId}`, { updatePassword }, { headers: { Authorization: `Bearer ${token}` } })

                setPasswordNotMatch(passwordres.data.passwordNotMatch)
                setPasswordMatch(passwordres.data.success)

                setUpdatePassword(null)

                const res = await axios.get(`http://localhost:3000/users-data/${userId}`, { headers: { Authorization: `Bearer ${token}` } })

                setUserData(res.data.user)

                setLoading(false)

            } catch (error) {

                setError(true)
                setLoading(false)

            }


        })()
    }, [updatePassword])


    //Return user data and update status.
    return {
        loading,
        error,
        userData,
        passwordNotMatch,
        setPasswordNotMatch,
        passwordMatch,
        setPasswordMatch

    }
}

export default UseSettings
