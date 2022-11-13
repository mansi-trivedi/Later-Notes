import React from 'react'
import "../style/Welcome.css"
import {useNavigate} from "react-router-dom"

const Welcome = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className='Welcome'>
            <div className='UiLogo'>
                <img src={require('../icons/later_notes_logo.png')} alt="Logo" height="120" width="120"/> 
            </div>
            <div className='LoginRegister'>
                <h1><b>WELCOME TO LATER NOTES</b></h1>
                <button className="homeLogin" onClick={() => navigate("/Login")}>Login</button>
                <button className="homeRegister" onClick={() => navigate("/Register")}>Register</button>
            </div>
        </div> 
    </>
  )
}

export default Welcome 
