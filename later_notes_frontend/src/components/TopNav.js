import React from 'react'
import "../style/TopNav.css"
import { NavLink, Link } from "react-router-dom";


const TopNav = () => {

  const logOut = () => {
    localStorage.removeItem("user");
    alert("Logged Out Successfully")
    window.location.href = '/';
  }

  return (
    <>
      <div className='topNav'>
        <div className='Logout'>
          <button onClick={logOut}>Logout</button>
        </div>
        <div className="Pages">
          <div className='Logo'>
            <Link to={"/"}>
              <img src={require('../icons/later_notes_logo.png')} alt="Logo" height="120" width="120" />
            </Link>
          </div>
          <ul>
            <li>
              <NavLink className={({ isActive }) => (isActive ? "link-active" : "link")} to="/Dashboard">Dashboard</NavLink>
            </li>
            <li>
              <NavLink className={({ isActive }) => (isActive ? "link-active" : "link")} to="/AboutUs">About Us</NavLink>
            </li>
            <li>
              <NavLink className={({ isActive }) => (isActive ? "link-active" : "link")} to="/MyNotes">My Notes</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default TopNav
