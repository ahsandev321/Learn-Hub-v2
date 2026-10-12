import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/navbar/Navbar'
import Footer from '../components/Footer/Footer'

function MainLayout() {
  return (
    <div>
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
