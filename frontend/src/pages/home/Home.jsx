import React, { useEffect, useState } from 'react'
import './Home.css'
import { NavLink, useLocation, useNavigate, } from 'react-router-dom'
import images from '../../images/images.jpg'
import { FaBookOpen, FaGraduationCap, FaChartLine } from 'react-icons/fa'
import { Oval } from 'react-loader-spinner'
import UseHome from './UseHome'
function Home() {

  //store contact form data.
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setsetMessage] = useState('')

  const [contactUsData, setContactUsData] = useState(null)

  const [empty, setEmpty] = useState(false)

  //Get form submission status and loading state.
  const { loading, error, submit, setSubmit } = UseHome({ contactUsData, setContactUsData })

  const location = useLocation()

  const navigate = useNavigate()

  //Show a success message after submitting the form.
  useEffect(() => {

    if (submit) {

      alert("Your message has been submit successfullly!")

      setSubmit(false)

    }

  }, [submit])

  //Scroll to the selected section when navigating form another page.
  useEffect(() => {

    if (location.pathname === "/" && location.state?.scrollToServices) {
      document.getElementById("services")?.scrollIntoView({
        behavior: "smooth"
      })
      navigate("/#services", { replace: true, state: null })
    }

    if (location.pathname === "/" && location.state?.scrollToHome) {
      document.getElementById("home")?.scrollIntoView({
        behavior: "smooth"
      })
      navigate("/#home", { replace: true, state: null })
    }

    if (location.pathname === "/" && location.state?.scrollToContactUs) {
      document.getElementById("contactus")?.scrollIntoView({
        behavior: "smooth"
      })
      navigate("/#contactus", { replace: true, state: null })
    }


  }, [location, navigate])

  //Validate and submit the contact form.
  const contactUsmessage = (e) => {

    e.preventDefault()

    setEmpty(true)

    if (!name || !email || !message) return

    const userId = localStorage.getItem("userId")

    setContactUsData({
      userId: userId,
      name: name,
      email: email,
      message: message

    })


    //Clear the form after submission.
    setEmpty(false)
    setName('')
    setEmail('')
    setsetMessage('')

  }



  return (
    <div className='home-main-conatiner' id='home'>

      {/*Display a loader while the video request is rinning. */}
      {loading && (<div className='loading-section'> <div className='loading-title'> <Oval width={27} height={27} strokeWidth={5} visible={true} color="white" secondaryColor="rgb(79, 77, 77)" /><h1>Loading...</h1></div> </div>)}

      {/*Display an error message when the video request fails. */}
      {error && (<div className='error-section'> <div className='error-title'><h1>Some thing went wrong...</h1></div> </div>)}



      {/*Hero section with text and image. */}
      <div className='home-hero-section-container'>

        {/*Heading and course navigation button. */}
        <div className='home-hero-text-section'>
          <h1>Explore courses </h1>
          <h1> and improve your </h1>
          <h1>skills with <span className='home-hero-text'>Learn</span>Hub. </h1>

          <NavLink to='/courses' > <button className='home-hero-section-button'> Explore Courses </button> </NavLink>
        </div>

        {/*Hero image */}
        <div className='home-hero-image-section'>
          <img src={images} width='100%' height="100%" alt="home page" />
        </div>
      </div>

      {/*Display the services cards. */}
      <div className='home-services-section-maincontainer' id='services'>

        <h1>Services</h1>

        <div className='home-services-cards-section'>

          <div className='home-services-cards'>

            <div className='home-services-cards-icon-section'>
              <FaBookOpen className='home-services-cards-icon' />
            </div>

            <div className='home-services-cards-text-heading-section'>

              <h2>Online Courses</h2>
            </div>

            <div className='home-services-cards-text-section'>

              <p>Explore different courses and learn new skill anytime, anywhere.</p>
            </div>

            <div>

            </div>

          </div>

          <div className='home-services-cards'>

            <div className='home-services-cards-icon-section'>
              <FaGraduationCap className='home-services-cards-icon' />
            </div>

            <div className='home-services-cards-text-heading-section'>

              <h2>Expert Instructors</h2>
            </div>

            <div className='home-services-cards-text-section'>

              <p>Learn from exprienceed instructors and imporve your konwledge and skills.</p>
            </div>

            <div>

            </div>

          </div>

          <div className='home-services-cards'>

            <div className='home-services-cards-icon-section'>
              <FaChartLine className='home-services-cards-icon' />
            </div>

            <div className='home-services-cards-text-heading-section'>

              <h2>Easy Learning</h2>
            </div>

            <div className='home-services-cards-text-section'>

              <p>Access course videos and assignments in one place to support your learning.</p>
            </div>

            <div>

            </div>

          </div>


        </div>

      </div>

      {/*Contact form for user messages. */}
      <div className='home-contact-maincontainer-section' id='contactus'>

        <h1>Contact Us</h1>

        <div className='home-contact-us-section'>

          <form onSubmit={contactUsmessage}>

            <div className='home-contact-us-input-field-container'>

              <div className='home-contact-us-input-field-section'>
                <h3>Name :</h3>

                <input
                  className={empty && !name ? 'home-contact-us-invalid-input-field' : 'home-contact-us-input-field'}
                  type="text"
                  placeholder='Enter Your Name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

              </div>

              <div className='home-contact-us-input-field-section'>

                <h3>Email :</h3>

                <input
                  className={empty && !email ? 'home-contact-us-invalid-input-field' : 'home-contact-us-input-field'}
                  type="email"
                  placeholder='Enter Your Email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />


              </div>


            </div>
            <div className='home-contact-us-text-input-field-section'>

              <h3>Write Message :</h3>

              <textarea
                className={empty && !message ? 'home-contact-us-invalid-text-input-field' : 'home-contact-us-text-input-field'}
                placeholder='Write Your Message'
                value={message}
                onChange={(e) => setsetMessage(e.target.value)}

              />

            </div>

            <div className='home-contact-us-submit-button-section'>
              <button className='home-contact-us-submit-button'>Submit</button>
            </div>

          </form>

        </div>





      </div>


    </div>



  )
}

export default Home
