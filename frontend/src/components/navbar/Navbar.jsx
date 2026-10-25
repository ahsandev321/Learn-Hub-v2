import React, { useEffect, useState } from 'react'
import './Navbar.css'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa'
function Navbar() {

    //Store the moblie menue state.
    const [menue, setMenue] = useState(false)

    //Get the user's login status and role.
    const [login, setLogin] = useState(localStorage.getItem("login"))

    const [role, setRole] = useState(localStorage.getItem("role"))

    const navigate = useNavigate()

    const location = useLocation()

    //Update login status and role when login changes.
    useEffect(() => {

        const updateLogin = () => {

            setLogin(localStorage.getItem("login"))
            setRole(localStorage.getItem("role"))

        }

        window.addEventListener("loginChanged", updateLogin)

        //Remove the event listener when the component unmounts
        return () => {
            window.removeEventListener("loginChanged", updateLogin)
        }

    }, [])

    const handleServicesClick = (e) => {
        e.preventDefault()

        setMenue(false)

        //Navigate to the services section from another page.
        if (location.pathname !== "/") {
            navigate("/#services", { state: { scrollToServices: true } })

        }
        else {
            navigate("/#services")

            //Smoothly scroll to the services section on the home page.
            document.getElementById("services")?.scrollIntoView({
                behavior: "smooth"
            })
        }
    }
    const handleHomwClick = (e) => {
        e.preventDefault()

        setMenue(false)
        //Navigate to the home section from another page.
        if (location.pathname !== "/") {
            navigate("/#home", { state: { scrollToHome: true } })

        }
        else {
            navigate("/#home")
            //Smoothly scroll to the home section on the home page.
            document.getElementById("home")?.scrollIntoView({
                behavior: "smooth"
            })
        }
    }
    const handleContactUsClick = (e) => {
        e.preventDefault()

        setMenue(false)
        //Navigate to the Contact US section from another page.
        if (location.pathname !== "/") {
            navigate("/#contactus", { state: { scrollToContactUs: true } })

        }
        else {
            navigate("/#contactus")
            //Smoothly scroll to the Constact Us section on the home page.
            document.getElementById("contactus")?.scrollIntoView({
                behavior: "smooth"
            })
        }
    }

    //Clear user data and redirect to the login page.
    const logout = () => {
        localStorage.removeItem("login")
        localStorage.removeItem("role")
        localStorage.removeItem("userId")
        localStorage.removeItem("myCourses")
        localStorage.removeItem("courseId")
        localStorage.removeItem("myCourseId")
        localStorage.removeItem("selectedStudentId")
        localStorage.removeItem("token")

        //Redirect the user to the login page.
        navigate('/login', { replace: true })

        //Notify other components about the login status change.
        window.dispatchEvent(new Event("loginChanged"))
    }


    return (
        <div className='nav-main-container'>

            {/*Website logo and home link. */}
            <NavLink to="/" onClick={handleHomwClick} className='nav-link'>
                <div className='nav-logo-section'>
                    <h1> <span className='nav-logo-text'>Learn</span>Hub</h1>
                </div>
            </NavLink>

            {/*Main navigation links. */}
            <div className='nav-link-section'>
                <NavLink to="/" className='nav-link' onClick={handleHomwClick}>

                    <div className={location.hash === "#home" ? "nav-active-links" : "nav-links"}><h1>Home</h1></div>

                </NavLink>

                <NavLink to='/' className='nav-link' onClick={handleServicesClick} >

                    <div className={location.hash === "#services" ? "nav-active-links" : "nav-links"}><h1>Services</h1></div>

                </NavLink>
                <NavLink to='/' className='nav-link' onClick={handleContactUsClick} >

                    <div className={location.hash === "#contactus" ? "nav-active-links" : "nav-links"}><h1>Contact Us</h1></div>

                </NavLink>

                <NavLink to='/courses' className='nav-link'>
                    {({ isActive }) => (
                        <div className={isActive ? "nav-active-links" : "nav-links"}><h1>Courses</h1></div>
                    )}
                </NavLink>

                {/*Show admin only for logged-in asmin. */}
                {login === "true" && role === "admin" && (
                    <NavLink to='/adminDashboard' className='nav-link'>
                        {({ isActive }) => (
                            <div className={isActive ? "nav-active-links" : "nav-links"}><h1>Admin</h1></div>
                        )}
                    </NavLink>
                )}


                {/*Show my courses only for logged-in students.  */}
                {login === "true" && role === "student" && (
                    <NavLink to='/studentDashboard' className='nav-link'>
                        {({ isActive }) => (
                            <div className={isActive ? "nav-active-links" : "nav-links"}><h1>My Courses</h1></div>
                        )}
                    </NavLink>
                )}

                {/*Show my teaching only for logged-in instructors. */}
                {login === "true" && role === "instructor" && (
                    <NavLink to='/instructorDashboard' className='nav-link'>
                        {({ isActive }) => (
                            <div className={isActive ? "nav-active-links" : "nav-links"}><h1>My Teaching</h1></div>
                        )}
                    </NavLink>
                )}


            </div>
            {/*Login, logout, and mobile menue buttons. */}
            <div className='nav-button-section'>

                {/*Toggle the mobile menue icon */}
                <button onClick={() => setMenue(!menue)} className='nav-menue-icon'>{menue ? <FaTimes /> : <FaBars />}</button>

                {/*Show logout or login and signup buttons */}
                {login === "true" ?
                    <div>
                        <button onClick={logout} className='nav-logout-button'>Logout</button>
                    </div>
                    :
                    <div>
                        <NavLink to="/login" className='nav-link'><button className='nav-buttons'>Login</button></NavLink>
                        <NavLink to="/signUp" className='nav-link'> <button className='nav-buttons'>Signup</button></NavLink>
                    </div>
                }

                {/*Show moblie navigation when the menue is open. */}
                {menue && (<div className='nav-menue-link-section'>
                    <ul className='nave-menue-links'>
                        <NavLink to="/" className='nav-link' onClick={handleHomwClick}><li className='nav-menue-link'> <h1>Home</h1></li></NavLink>
                        <hr />
                        <NavLink to="/" className='nav-link' onClick={handleServicesClick}><li className='nav-menue-link'> <h1>Services</h1></li></NavLink>
                        <hr />
                        <NavLink to="/" className='nav-link' onClick={handleContactUsClick}><li className='nav-menue-link'> <h1>Contact Us</h1></li></NavLink>
                        <hr />
                        <NavLink to="/courses" className='nav-link'><li className='nav-menue-link'> <h1>Courses</h1></li></NavLink>
                        <hr />

                        {/*Show student dashboard link for students. */}
                        {login === "true" && role === "admin" && (
                            <NavLink to="/adminDashboard" className='nav-link'><li className='nav-menue-link'> <h1>Admin</h1></li></NavLink>
                        )}

                        {/*Show student dashboard link for students. */}
                        {login === "true" && role === "student" && (
                            <NavLink to="/studentDashboard" className='nav-link'><li className='nav-menue-link'> <h1>My Courses</h1></li></NavLink>
                        )}

                        {/*Show instructor dashboard link for instructors. */}
                        {login === "true" && role === "instructor" && (
                            <NavLink to="/instructorDashboard" className='nav-link'><li className='nav-menue-link'> <h1>My Teaching</h1></li></NavLink>
                        )}
                        <hr />

                        {/*Show logout or login and signup buttons in the mobile menue. */}
                        {login === "true" ?

                            <div className='nav-menue-button-section'>
                                <button onClick={logout} className='nav-menue-logout-button'>Logout</button>
                            </div>

                            :
                            <div className='nav-menue-button-section'>

                                <NavLink to="/login" className='nav-menue-button-link'><button className='nav-menue-buttons'>Login</button></NavLink>
                                <NavLink to="/signUp" className='nav-menue-button-link'> <button className='nav-menue-buttons'>Signup</button></NavLink>
                            </div>}



                    </ul>
                </div>)}
            </div>

        </div>
    )
}

export default Navbar
