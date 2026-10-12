import React, { useEffect, useState } from 'react'
import './Footer.css'
import { NavLink, useNavigate } from 'react-router-dom'

function Footer() {

    //Store the user's login ststus.
    const [login, setLogin] = useState(localStorage.getItem("login"))

    const navigate = useNavigate()

    //Update login status when the loginChanged event occurs.
    useEffect(() => {

        const updateLogin = () => {

            setLogin(localStorage.getItem("login"))


        }

        window.addEventListener("loginChanged", updateLogin)

        //Remove the event listener when component unmounts.
        return () => {
            window.removeEventListener("loginChanged", updateLogin)
        }

    }, [])

    //Clear user data and redirect to the login page.
    const logout = () => {
        localStorage.removeItem("login")
        localStorage.removeItem("role")
        localStorage.removeItem("userId")
        localStorage.removeItem("myCourses")
        localStorage.removeItem("courseId")
        localStorage.removeItem("myCourseId")
        localStorage.removeItem("selectedStudentId")

        //Redirect the user to the login page.
        navigate('/login', { replace: true })

        //Notify other components about the login status change.
        window.dispatchEvent(new Event("loginChanged"))
    }


    return (
        <div className='footer-maincontainer'>

            <div className='footer-content-section'>

                {/*Website logo and home link. */}
                <div className='footer-content-logo-card'>

                    <NavLink to="/" className='footer-link'>
                        <div className='footer-logo-section'>
                            <h1> <span className='footer-logo-text'>Learn</span>Hub</h1>
                        </div>
                    </NavLink>

                </div>

                {/*Navigation links */}
                <div className='footer-content-quick-links-card'>
                    <h1> Quick Links</h1>

                    <NavLink to="/" className='footer-link'>

                        <div className='footer-quick-links'><h1>Home</h1></div>

                    </NavLink>

                    <NavLink to='/courses' className='footer-link'>

                        <div className="footer-quick-links"><h1>Courses</h1></div>

                    </NavLink>

                </div>
                {/*Show links based on the user's login status */}
                <div className='footer-content-quick-links-card'>
                    <h1> Register</h1>

                    {login === "true" ?

                        //Show the logout link when the user is logged in.
                        <div className='footer-register-links-section'>
                            <NavLink onClick={logout} className='footer-link'><div className="footer-quick-links"><h1>Logout</h1></div></NavLink>
                        </div>

                        :
                        //Show login and signup links when the user is logout out.
                        <div className='footer-register-links-section'>

                            <NavLink to="/login" className='footer-link'> <div className="footer-quick-links"><h1>Login</h1></div> </NavLink>
                            <NavLink to="/signUp" className='footer-link'>  <div className="footer-quick-links"><h1>signUp</h1></div> </NavLink>
                        </div>}
                </div>


            </div>


            <div className='footer-content-text-section'>
                <p>2026</p>
            </div>

        </div>
    )
}

export default Footer
