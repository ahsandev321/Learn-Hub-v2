import React, { useEffect, useState } from 'react'
import './Settings.css'
import UseSettings from './UseSettings'
import { Oval } from 'react-loader-spinner'
import { FiEdit2 } from 'react-icons/fi'

function Settings() {

    //Manage name and email editing.
    const [isNameEdit, setIsNameEdit] = useState(false)
    const [editName, setEditName] = useState("")

    const [isEmailEdit, setIsEmailEdit] = useState(false)
    const [editEmail, setEditEmail] = useState("")

    //Store update profile data and form validation state.
    const [updateName, setUpdateName] = useState(null)
    const [updateEmail, setUpdateEmail] = useState(null)
    const [empty, setEmpty] = useState(false)

    //Show or hide password.
    const [showPreviousPassword, setShowPreviousPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    //Store the current and new password.
    const [previousPassword, setPreviousPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")

    const [updatePassword, setUpdatePassword] = useState(null)


    //Get user data and password update status.
    const { loading, error, userData, passwordNotMatch, setPasswordNotMatch, passwordMatch, setPasswordMatch } = UseSettings({ updateName, updateEmail, updatePassword, setUpdateName, setUpdateEmail, setUpdatePassword })

    //Show an error if the current pssword is incorrect.
    useEffect(() => {

        if (passwordNotMatch) {
            alert("Invalid Password")
            setPasswordNotMatch(false)
        }

    }, [passwordNotMatch])

    //Show a message after a successful password change.
    useEffect(() => {

        if (passwordMatch) {
            alert("Password Chenge Successsfully")
            setPasswordMatch(false)
        }

    }, [passwordMatch])

    //Open the name edit form.
    const handleEditName = () => {

        setIsNameEdit(!isNameEdit)
        setEditName(userData.name)

    }
    //Cancel name editing.
    const CancleEditName = () => {
        setIsNameEdit(false)
        setEditName("")
    }
    //Validate and update the user's name.
    const updateProfileName = (e) => {

        e.preventDefault()


        setEmpty(true)

        if (!editName.trim()) return

        setUpdateName(editName)

        setEmpty(false)
        setIsNameEdit(false)
        setEditName("")
    }


    //Open the email edit form.
    const handleEditEmail = () => {

        setIsEmailEdit(!isEmailEdit)
        setEditEmail(userData.email)

    }

    //Cancel email editing.
    const CancleEditEmail = () => {
        setIsEmailEdit(false)
        setEditEmail("")

    }

    //Validate and update the user's email.
    const updateProfileEmail = (e) => {

        e.preventDefault()

        setEmpty(true)

        if (!editEmail.trim()) return

        setUpdateEmail(editEmail)

        setEmpty(false)
        setIsEmailEdit(false)
        setEditEmail("")

    }

    //validate and submit the password change request.
    const changePassword = (e) => {

        e.preventDefault()

        setEmpty(true)

        if (!previousPassword || !newPassword) return
        if (previousPassword.length < 8 || newPassword.length < 8) return

        setUpdatePassword({
            previousPassword,
            newPassword
        })


        setEmpty(false)
        setPreviousPassword("")
        setNewPassword("")


    }


    return (
        <div className='settings-maincontainer'>


            {/*Display a loader while the video request is rinning. */}
            {loading && (<div className='loading-section'> <div className='loading-title'> <Oval width={27} height={27} strokeWidth={5} visible={true} color="white" secondaryColor="rgb(79, 77, 77)" /><h1>Loading...</h1></div> </div>)}

            {/*Display an error message when the video request fails. */}
            {error && (<div className='error-section'> <div className='error-title'><h1>Some thing went wrong...</h1></div> </div>)}

            {/*Display and edit the user's profile details. */}
            <div className='settings-mincontainer-section'>

                <h1>Settings</h1>

                <div className='setting-profile-section'>
                    <h2>Profile</h2>


                    <div className='setting-profile-heading'>
                        <p>Full Name :</p>
                        {!isNameEdit ? (
                            <div className='setting-profile-text'>
                                <h3>{userData.name}</h3>
                                <button className='setting-profile-edit-button' onClick={handleEditName} >  <FiEdit2 className='setting-profile-edit-icon' /></button>
                            </div>
                        ) : (
                            <form onSubmit={updateProfileName} className='setting-profile-form-section' >
                                <div className='setting-profile-text-edit-section' >
                                    <input
                                        type="text"
                                        className={empty && !editName.trim() ? 'setting-profile-invalid-input-field' : 'setting-profile-input-field'}
                                        value={editName}
                                        onChange={(e) => setEditName(e.target.value)}
                                    />

                                    <div className='setting-profile-button-section'>
                                        <button className='setting-profile-update-button' >Update</button>

                                        <button onClick={CancleEditName} className='setting-profile-cancel-button' >Cancle</button>
                                    </div>

                                </div>
                            </form>
                        )}
                    </div>

                    <div className='setting-profile-heading'>
                        <p>Email :</p>

                        {!isEmailEdit ? (
                            <div className='setting-profile-text'>
                                <h3>{userData.email}</h3>
                                <button className='setting-profile-edit-button' onClick={handleEditEmail} >  <FiEdit2 className='setting-profile-edit-icon' /></button>
                            </div>
                        ) : (
                            <form onSubmit={updateProfileEmail} className='setting-profile-form-section' >
                                <div className='setting-profile-text-edit-section' >
                                    <input
                                        type="email"
                                        className={empty && !editEmail.trim() ? 'setting-profile-invalid-input-field' : 'setting-profile-input-field'}
                                        value={editEmail}
                                        onChange={(e) => setEditEmail(e.target.value)}
                                    />

                                    <div className='setting-profile-button-section'>
                                        <button className='setting-profile-update-button' >Update</button>

                                        <button onClick={CancleEditEmail} className='setting-profile-cancel-button' >Cancle</button>
                                    </div>

                                </div>
                            </form>

                        )}


                    </div>

                    <div className='setting-profile-heading'>
                        <p>Role :</p>
                        <div className='setting-profile-text'>
                            <h3>{userData.role}</h3>
                        </div>
                    </div>




                </div>

            </div>

            {/*Form to change the useer's password. */}
            <div className='setting-password-maincontainer'>

                <h2>Change Password</h2>

                <form onSubmit={changePassword} className='setting-profile-form-section' >
                    <div className='setting-password-input-field-maincontainer'>
                        <div className='setting-password-input-field-section'>
                            <input type={showPreviousPassword ? "text" : "password"}
                                className={empty && (!previousPassword || previousPassword.length < 8) ? 'setting-invalid-password-input-field' : 'setting-password-input-field'}
                                placeholder='Enter Your previous Password'
                                value={previousPassword}
                                onChange={(e) => setPreviousPassword(e.target.value)}
                            />

                            {/*Button to show or hide password.*/}
                            <button type='button' onClick={(e) => setShowPreviousPassword(!showPreviousPassword)} className={previousPassword ? 'setting-show-password-button' : "setting-hide-password-button"} >{showPreviousPassword ? "Hide" : "Show"}</button>
                        </div>

                        {/*Show password validation message.*/}
                        <h5 className='setting-password-invalid-massage'>{previousPassword.length < 8 && empty ? "It should be at least 8 characters long." : ""}</h5>
                    </div>

                    <div className='setting-password-input-field-maincontainer'>
                        <div className='setting-password-input-field-section'>
                            <input type={showNewPassword ? "text" : "password"}
                                className={empty && (!newPassword || newPassword.length < 8) ? 'setting-invalid-password-input-field' : 'setting-password-input-field'}
                                placeholder='Enter Your New Password'
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />

                            {/*Button to show or hide password.*/}
                            <button type='button' onClick={(e) => setShowNewPassword(!showNewPassword)} className={previousPassword ? 'setting-show-password-button' : "setting-hide-password-button"} >{showNewPassword ? "Hide" : "Show"}</button>
                        </div>

                        {/*Show password validation message.*/}
                        <h5 className='setting-password-invalid-massage'>{newPassword.length < 8 && empty ? "It should be at least 8 characters long." : ""}</h5>
                    </div>

                    <div className='setting-change-password-button-section'>
                        <button className='setting-change-password-button'>Update password</button>

                    </div>
                </form>

            </div>



        </div>
    )
}

export default Settings
