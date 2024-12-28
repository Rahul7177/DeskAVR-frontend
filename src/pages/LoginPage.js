import React from 'react'
import Navbar from '../components/Navbar'
import Login from '../components/Login'
import Footer from '../components/Footer'
import '../stylesheets/Login.css'
// import Footer from '../components/Footer'

const LoginPage = () => {
  return (
    <div>
    <Navbar/>
    <Login/>
    {/* <Footer/> */}
    <Footer/>
    </div>
  )
}

export default LoginPage