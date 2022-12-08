import React from 'react'
import "../style/AboutUs.css"
import SideNav from './SideNav'
import TopNav from './TopNav'

const AboutUs = () => {
  const KnowMeStyle = {
    color: "rgb(87, 84, 84)"
  }

  const paragraphStyle = {
    color: "rgb(48, 41, 41)"
  }

  const imageStyle = {
    padding: "10px 15px"
  }

  return (
    <>
      <TopNav/>
      <SideNav/>
      <div className='About'>
        <div className='content'>
          <div className='inner-content'>
              <p style={KnowMeStyle}>Know Me</p>
              <br/>
              <p style={paragraphStyle}>Later Notes is a web application basically whenever user will start his/her meting on any platform either zoom, teams or google meet. 
                  they will start this app and play the start recording button and can take their meeting the app in background will automatically convert 
                  the audio which will be live on that time into the text format and create a pdf of that complete document. 
                  after user play stop recording user can download those notes in pdf format by the download pdf option provided in the app. </p>
          </div>
        <div style={imageStyle}><img src={require('../icons/aboutUs.png')} alt="AboutUS" height="300" width="400"/></div>  
          </div>
      </div>
    </>
  )
}

export default AboutUs
