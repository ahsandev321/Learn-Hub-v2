import { useEffect, useState } from 'react'
import axios from 'axios'
function UseSignup({ saveData }) {

    // Store the loading state.
    const [loading, setLoading] = useState(false);

    //Store the error state.
    const [error, setError] = useState(false);

    //Check if email is already exists.
    const [existsData, setExistsData] = useState(false);

    //Check if signup is successful.
    const [submit, setSubmit] = useState(false);

    //Run when signup data changes.
    useEffect(() => {

        //Stop if there is not data.
        if (Object.keys(saveData).length === 0) return;

        //Send signup data.
        (async () => {

            try {

                //Show the loading screen.
                setLoading(true);

                //Reset any previous error.
                setError(false)

                //Send data to API.
                const res = await axios.post("http://localhost:3000/signup", saveData);

                //Check existing email.
                setExistsData(res.data.existEmail)

                //Check signup result.
                setSubmit(res.data.submitData)

                //Hide the loading screen.
                setLoading(false);


            } catch (error) {

                //Show the error message if the API fails.
                setError(true);

                //Hide the loading screen.
                setLoading(false);

            }

        })()

    }, [saveData])

    //Return data to component.
    return {
        loading,
        error,
        existsData,
        submit,
        setExistsData
    }


}

export default UseSignup
