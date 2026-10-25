import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/navbar/Navbar'
import Footer from '../components/Footer/Footer'
import Interceptor from '../config/Interceptor'

function MainLayout() {
  return (
    <div>

      {/*Add axios authentication interceptor. */}
      <Interceptor />

      {/*Display the navigation bar on all pagrs. */}
      <Navbar />

      {/*Render the current child router component. */}
      <Outlet />

      {/*Dispaly the footer on all pages. */}
      <Footer />
    </div>
  )
}

export default MainLayout
