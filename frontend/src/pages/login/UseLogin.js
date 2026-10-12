import { useEffect, useState } from 'react'
import axios from 'axios'
function UseLogin({ saveData }) {

    // Store the loading state.
    const [loading, setLoading] = useState(false);

    //Store the error state.
    const [error, setError] = useState(false);

    //Check email.
    const [invalidEmail, setInvalidEmail] = useState(false);

    //Check password.
    const [invalidPassword, setInvalidPassword] = useState(false);

    //Check login result.
    const [validData, setValidData] = useState(false);

    //Run when login data change.   
    useEffect(() => {

        //Stop if there is no data.
        if (Object.keys(saveData).length === 0) return;

        //Send login data.
        (async () => {
            try {

                //Show the loading screen.
                setLoading(true)

                //Reset any previous error.
                setError(false)

                //Send data to API.
                const res = await axios.post("http://localhost:3000/login", saveData);

                //Check email result.
                setInvalidEmail(res.data.emailNotMatch)

                //Check password result.
                setInvalidPassword(res.data.passwordNotMatch)

                //Check login result.
                setValidData(res.data.dataMatch)

                if (res.data.dataMatch) {
                    //Save user ID.
                    localStorage.setItem("userId", res.data.userId)

                    //Save user role.
                    localStorage.setItem("role", res.data.role)
                }

                //Hide the loading screen.
                setLoading(false)

            } catch (error) {

                //Show the error message if the API fails.
                setError(true)

                //Hide the loading screen.
                setLoading(false)
            }
        })()
    }, [saveData])

    //Return data to component.
    return {
        loading,
        error,
        invalidEmail,
        invalidPassword,
        validData,
        setInvalidEmail,
        setInvalidPassword
    }


}

export default UseLogin
