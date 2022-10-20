import React from 'react'
import "../style/Home.css"
import SideNav from '../navigation/SideNav'
import Footer from '../footer/Footer'
import TopNav from '../navigation/TopNav'

const Home = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <>
      <TopNav/>
      <SideNav/>
      <div className='Home'>
        <div className='WelcomUser'>
          {
            user ? <h1>WELCOME BACK, <br/> <b>{user.user[0].username}</b></h1> : <h1><b>WELCOME BACK</b></h1>
          }
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default Home