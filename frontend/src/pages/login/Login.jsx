import React, { useEffect, useState } from 'react'
import './Login.css'
import UseLogin from './UseLogin'
import { Oval } from 'react-loader-spinner'
import { NavLink, useNavigate } from 'react-router-dom';

function Login() {

  //Store password.
  const [password, setpassword] = useState("");

  //Store email.
  const [email, setEmail] = useState("");

  //Show or hide password. 
  const [showPassword, setShowPassword] = useState(false);

  //Check empty fields. 
  const [empty, setEmpty] = useState(false);

  //Store login data.
  const [saveData, setsaveData] = useState({})

  //Get login data from custom hook.
  const { loading, error, invalidEmail, invalidPassword, validData, setInvalidEmail, setInvalidPassword } = UseLogin({ saveData })

  //Use to change page.
  const navigate = useNavigate();

  //Check invalid email.
  useEffect(() => {

    if (invalidEmail) {

      //Show email error.
      alert("Invalid Email");

      //Reset email error
      setInvalidEmail(false);
    }
  }, [invalidEmail])

  //Check invalid passeord.
  useEffect(() => {

    if (invalidPassword) {

      //Show password error.
      alert("Invalid Password");

      //Reset password error.
      setInvalidPassword(false);

    }

  }, [invalidPassword])

  useEffect( ()=>{
    //Go to Dashboard after login.
  if (validData) {

    //Save login status.
    localStorage.setItem("login", "true")

    window.dispatchEvent( new Event("loginChanged"))

     const role = localStorage.getItem("role")

     if(role === "student"){

       navigate("/studentDashboard", { replace: true })

     }
     
     if(role === "instructor"){

       navigate("/instructorDashboard", { replace: true })
       
     }

  }

  },[validData, navigate])
  //Login form submit function.
  const submitLogin = (e) => {

    //Stop page reload.
    e.preventDefault();

    //Start field checking.
    setEmpty(true);

    //Stop if field or empty
    if (!password || !email) return;

    //Check password length.
    if (password.length < 8) return;

    //Create login data.
    const fieldData = {

      email,
      password
    };

    //Save login data.
    setsaveData(fieldData);


  }

  return (
    <div className='login-main-container'>

      {/*Show loading screen while API is working. */}
      {loading && (<div className='loading-section'> <div className='loading-title'> <Oval width={27} height={27} strokeWidth={5} visible={true} color="white" secondaryColor="rgb(79, 77, 77)" /><h1>Loading...</h1></div> </div>)}

      {/*Show loading screen while API is working. */}
      {error && (<div className='error-section'> <div className='error-title'><h1>Some thing went wrong...</h1></div> </div>)}


      <div className='login-main-section'>

        {/*Login form section. */}
        <h1> Login </h1>
        <form onSubmit={submitLogin}>

          {/*Password field. */}
          <div className='login-input-field-section'>
            <div className='login-field-section'>
              <input type={showPassword ? "text" : "password"}
                className={empty && (!password || password.length < 8) ? 'login-invalid-input' : 'login-input'}
                placeholder=''
                value={password}
                onChange={(e) => setpassword(e.target.value)}
              />

              <div className={empty && (!password || password.length < 8) ? 'login-error-placeholer' : 'login-placeholer'}><h2> Enter Your Password </h2></div>
              {/*Button to show or hide password.*/}
              <button type='button' onClick={(e) => setShowPassword(!showPassword)} className={password ? 'login-password-button' : "login-password-button-hide"} >{showPassword ? "Hide" : "Show"}</button>
            </div>
            {/*Show password validation message.*/}
            <h5 className='login-password-message'> {password.length < 8 && empty ? "It should be at least 8 characters long." : ""}</h5>
          </div>

          {/* Email input field.*/}
          <div className='login-input-field-section'>
            <div className='login-field-section'>
              <input type='email'
                className={empty && (!email || !email.endsWith("@gmail.com")) ? 'login-invalid-input' : 'login-input'}
                placeholder=''
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onInvalid={() => setEmpty(true)}
              />
              {/*Email palaceholder..*/}

              <div className={empty && (!email || !email.endsWith("@gmail.com")) ? 'login-error-placeholer' : 'login-placeholer'}><h2> Enter Your Email </h2></div>
            </div>
          </div>
          {/*Login button.*/}
          <button className='login-button'>Login</button>
        </form>
        {/*Go to signup page.*/}
        <NavLink to="/signUp" > <button className='login-signUp-button'>Sign up</button></NavLink>


      </div>

    </div>
  )
}

export default Login
