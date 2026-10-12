import React, { useEffect, useState } from 'react'
import axios from 'axios';
function UseManageAssignment({ courseAssignment, deleteindux, setDeleteindux, editAssignment, editAssignmentindux, setEditAssignmentindux }) {

    // Store the loading state.
    const [assignmentLoading, setAssignmentLoading] = useState(false);

    //Store the error state.
    const [assignmentError, setAssignmentError] = useState(false);

    //Store the list of course assignments.
    const [assignmentdata, setAssignmentdata] = useState([])

    //Fetch all assignments on component mount.
    useEffect(() => {

        (async () => {


            try {

                setAssignmentLoading(true)
                setAssignmentError(false)

                const courseId = localStorage.getItem("courseId")

                const res = await axios.get(`http://localhost:3000/assignments?courseId=${courseId}`)

                setAssignmentdata(res.data.data)

                setAssignmentLoading(false)

            } catch (error) {


                setAssignmentError(true)
                setAssignmentLoading(false)



            }


        })()
    }, [])

    //Create a new assignment.
    useEffect(() => {

        if (!courseAssignment) return;

        (async () => {


            try {

                setAssignmentLoading(true)
                setAssignmentError(false)


                await axios.post("http://localhost:3000/assignments", courseAssignment)


                const courseId = localStorage.getItem("courseId")

                const res = await axios.get(`http://localhost:3000/assignments?courseId=${courseId}`)

                setAssignmentdata(res.data.data)


                setAssignmentLoading(false)

            } catch (error) {

                setAssignmentError(true)
                setAssignmentLoading(false)



            }


        })()
    }, [courseAssignment])

    //Update an existing assignment.
    useEffect(() => {

        if (!editAssignment) return;

        (async () => {


            try {

                setAssignmentLoading(true)
                setAssignmentError(false)


                await axios.put(`http://localhost:3000/assignments/${editAssignmentindux}`, editAssignment)

                setEditAssignmentindux(null)

                const courseId = localStorage.getItem("courseId")

                const res = await axios.get(`http://localhost:3000/assignments?courseId=${courseId}`)

                setAssignmentdata(res.data.data)


                setAssignmentLoading(false)

            } catch (error) {

                setAssignmentError(true)
                setAssignmentLoading(false)



            }


        })()
    }, [editAssignment])


    //Delete an assignment.
    useEffect(() => {

        if (deleteindux?.contentType !== 'assignment') return;

        (async () => {


            try {

                setAssignmentLoading(true)
                setAssignmentError(false)


                await axios.delete(`http://localhost:3000/assignments/${deleteindux._id}`)

                setDeleteindux(null)

                const courseId = localStorage.getItem("courseId")

                const res = await axios.get(`http://localhost:3000/assignments?courseId=${courseId}`)

                setAssignmentdata(res.data.data)


                setAssignmentLoading(false)

            } catch (error) {

                setAssignmentError(true)
                setAssignmentLoading(false)



            }


        })()
    }, [deleteindux])

    //Expose assignment state and data.
    return {
        assignmentLoading,
        assignmentError,
        assignmentdata
    }
}

export default UseManageAssignment
