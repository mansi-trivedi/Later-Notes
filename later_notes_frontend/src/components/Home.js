import React from 'react'
import "../style/Home.css"
import Footer from './Footer'
import TopNav from './TopNav'
import SideNav from './SideNav';

const Home = () => {
  const userData = JSON.parse(localStorage.getItem('user')).user;
  return (
    <>
      <TopNav/>
      <SideNav/>
      <div className='Home'>
        <div className='WelcomUser'>
          {
            userData ? <h1>WELCOME BACK, <br/> <b>{userData.username}</b></h1> : <h1><b>WELCOME BACK</b></h1>
          }
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default Home