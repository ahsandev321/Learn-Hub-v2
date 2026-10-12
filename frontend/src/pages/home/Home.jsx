import React from 'react'
import './Home.css'
import { NavLink, } from 'react-router-dom'
import images from '../../images/images.jpg'
function Home() {
  return (
    <div className='home-main-conatiner'>
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
    </div>
  )
}

export default Home
