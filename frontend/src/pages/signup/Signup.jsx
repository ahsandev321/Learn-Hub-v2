import React, { useEffect, useState } from 'react'
import './Signup.css'
import UseSignup from './UseSignup'
import { NavLink, useNavigate } from 'react-router-dom';
import {Oval} from 'react-loader-spinner'
function Signup() {

  //Store user name.
    const[name, setName]=useState('');

    //Store user email.
    const[email, setEmail]=useState('');

    //Store user password.
    const[password, setpassword]=useState('');

    //Show or hide password.
    const[showPassword, setShowPassword]=useState(false);
     
    //Store confirm password.
   const[confirmPassword, setConirmPassword]=useState('');

   //Show or hide confirm password.
   const[showConirmPassword, setShowConirmPassword]=useState('')

   //Store user role.
   const[userRole, setUserRole]=useState('')
    
   //Check empty fields.
   const[empty, setEmpty]=useState(false);

   //Store signup data.
   const[saveData, setSaveData]=useState({})

   //Use to go to another page.
   const navigate = useNavigate();

   //Get signup data and function from custom hook.
   const {loading, error, existsData, submit, setExistsData }=UseSignup({saveData} );

   //Check if the email already exists.
   useEffect(()=>{
    
    if(existsData){

      //Show message.
        alert('Data already Exists');

        //Reset exists data.
        setExistsData(false);
    }
   },[existsData])

   //Go to Login page after successfull signup.
   if(submit){
      
    navigate("/Login")

   }


   //Signup form submit function.
   const submitSignUp =(e)=>{

    //Stop page reload.
    e.preventDefault();

    //Start checking fields
    setEmpty(true);

    //Stop if any field is empty.
    if( !name|| !email|| !password|| !confirmPassword || !userRole)return;

    //Check password length.
    if(password.length < 8)return;

    //Check both passwords
    if(confirmPassword !== password)return;

    //Create signup data.
    const fieldsData= {
        name,
        email,
        password,
        confirmPassword,
        userRole
    }
    
    //Save signup data.
    setSaveData(fieldsData)

   }

  return (
    <div className='signup-main-container'>

      {/*Show loading screen while API is working. */}
      {loading && (<div className='loading-section'> <div className='loading-title'> <Oval width={27} height={27} strokeWidth={5} visible={true} color="white" secondaryColor="rgb(79, 77, 77)" /><h1>Loading...</h1></div> </div>)}

      {/*Show loading screen while API is working. */}
      {error && (<div className='error-section'> <div className='error-title'><h1>Some thing went wrong...</h1></div> </div>)}


      <div className='signup-main-section'>
        <h1> Sign Up</h1>

        <form onSubmit={submitSignUp}>

          {/*Name input field*/}
          <div className='signup-input-field-section'>
            <div className='signup-field-section'>
              <input type='text'
                className={!name && empty ? 'signup-invalid-input' : 'signup-input'}
                placeholder=''
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <div className={!name && empty ? "signup-error-placeholer" : 'signup-placeholer'}><h2> Enter Your Name </h2></div>
            </div>
          </div>

          {/*Email input field*/}
          <div className='signup-input-field-section'>
            <div className='signup-field-section'>
              <input type='email'
                className={empty && (!email || !email.endsWith("@gmail.com")) ? 'signup-invalid-input' : 'signup-input'}
                placeholder=''
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onInvalid={() => setEmpty(true)}
              />
              <div className={empty && (!email || !email.endsWith("@gmail.com")) ? 'signup-error-placeholer' : 'signup-placeholer'}><h2> Enter Your Email </h2></div>
            </div>
          </div>

          {/*Password input field*/}
          <div className='signup-input-field-section'>
            <div className='signup-field-section'>
              <input type={showPassword ? "text" : "password"}
                className={empty && (!password || password.length < 8) ? 'signup-invalid-input' : 'signup-input'}
                placeholder=''
                value={password}
                onChange={(e) => setpassword(e.target.value)}
              />

              <div className={empty && (!password || password.length < 8) ? 'signup-error-placeholer' : 'signup-placeholer'}><h2> Enter Your Password </h2></div>

              {/*Button to show or hide password.*/}
              <button type='button' onClick={(e) => setShowPassword(!showPassword)} className={password ? 'signup-password-button' : "signup-password-button-hide"} >{showPassword ? "Hide" : "Show"}</button>
            </div>

            {/*Show password validation message.*/}
            <h5 className='signup-password-message'>{password.length < 8 && empty ? "It should be at least 8 characters long." : ""}</h5>
          </div>

          {/*Confirm password input field*/}
          <div className='signup-input-field-section'>
            <div className='signup-field-section'>
              <input type={showConirmPassword ? "text" : "password"}
                className={empty && (!confirmPassword || confirmPassword !== password) ? 'signup-invalid-input' : 'signup-input'}
                placeholder=''
                value={confirmPassword}
                onChange={(e) => setConirmPassword(e.target.value)}
              />

              <div className={empty && (!confirmPassword || confirmPassword !== password) ? 'signup-error-placeholer' : 'signup-placeholer'}><h2> Confirm Password </h2></div>
                
                
              {/*Button to show or hide confirm password.*/}
              <button type="button" onClick={(e) => setShowConirmPassword(!showConirmPassword)} className={confirmPassword ? 'signup-password-button' : "signup-password-button-hide"} >{showConirmPassword ? "Hide" : "show"}</button>
            </div>

            {/*Show password mismatch message.*/}
            <h5 className='signup-password-message'>{confirmPassword !== password && empty ? "Password do not match." : ""}</h5>
          </div>

           {/*User role dropdown*/}
          <div className='signup-input-field-section'>
            <div className='signup-field-section'>
              <select onChange={(e)=>setUserRole(e.target.value)} className={!userRole && empty ? 'signup-invalid-input' : 'signup-input'} name="" id="" >
                <option value="">Select Role</option>
                <option value="student">student</option>
                <option value="instructor">instructor</option>
              </select>

            </div>
          </div>


          {/*Submit the signup form.*/}
          <button className='signup-button'>Sign UP</button>

        </form>

        {/*Link to the login page. */}
        <NavLink to="/login" > <button className='signUp-account-button'> I already have an account</button></NavLink>
      </div>




    </div>
  )
}

export default Signup
