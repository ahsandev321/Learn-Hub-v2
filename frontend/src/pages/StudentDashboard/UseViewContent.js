import React, { useEffect, useState } from 'react'
import axios from 'axios';

function UseViewContent({ contentStatus }) {


    //Store the loading state.
    const [contentStatusLoading, setContentStatusLoading] = useState(false);

    //Store the error state.
    const [contentStatusError, setContentStatusError] = useState(false);

    const [viewedContent, setViewedContent] = useState([])

    //Fetch the content already viewed by the student.
    useEffect(() => {

        (async () => {

            try {

                setContentStatusLoading(true)
                setContentStatusError(false)

                const token = localStorage.getItem("token")

                const studentId = localStorage.getItem("userId")

                const res = await axios.get(`http://localhost:3000/content-view?studentId=${studentId}`, { headers: { Authorization: `Bearer ${token}` } })

                setViewedContent(res.data.viewedContent)

                setContentStatusLoading(false)


            } catch (error) {

                setContentStatusError(true)
                setContentStatusLoading(false)



            }


        })()
    }, [])


    //Save the content status and refresh the viewed content list.
    useEffect(() => {

        if (!contentStatus) return;

        (async () => {

            try {

                setContentStatusLoading(true)
                setContentStatusError(false)

                const token = localStorage.getItem("token")

                await axios.post("http://localhost:3000/content-view", contentStatus, { headers: { Authorization: `Bearer ${token}` } })

                const studentId = localStorage.getItem("userId")

                const res = await axios.get(`http://localhost:3000/content-view?studentId=${studentId}`, { headers: { Authorization: `Bearer ${token}` } })

                setViewedContent(res.data.viewedContent)

                setContentStatusLoading(false)


            } catch (error) {

                setContentStatusError(true)
                setContentStatusLoading(false)



            }


        })()
    }, [contentStatus])


    //Return the content data and request status.
    return {
        contentStatusLoading,
        contentStatusError,
        viewedContent

    }
}


export default UseViewContent
