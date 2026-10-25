import React, { useEffect, useState } from 'react'
import axios from 'axios';

function UseHome({ contactUsData, setContactUsData }) {

  //Manage loading and error states.
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [submit, setSubmit] = useState(false)

  //Send the contact form data to the server.
  useEffect(() => {

    if (!contactUsData) return;

    (async () => {

      try {

        setLoading(true)

        setError(false)

        const token = localStorage.getItem("token")

        const res = await axios.post(`${process.env.REACT_APP_API_URL}/contact-us-data`, { contactUsData }, { headers: { Authorization: `Bearer ${token}` } })

        setSubmit(res.data.success)

        setContactUsData(null)

        setLoading(false)

      } catch (error) {

        setError(true)
        setLoading(false)



      }


    })()
  }, [contactUsData])



  //Return the form status and state updater.
  return {
    loading,
    error,
    submit,
    setSubmit

  }
}

export default UseHome
