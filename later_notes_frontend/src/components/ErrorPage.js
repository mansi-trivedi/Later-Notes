import React from 'react'
import "../style/ErrorPage.css"
import {useNavigate} from "react-router-dom"

const ErrorPage = () => {
    const navigate = useNavigate(); 
  return (
    <>
       <div class="errorPage">
            <div class="errorImg">
                <img src={require('../icons/error.png')} alt=""/> 
            </div>
            <div class="errorData">
                <h1>404</h1>
                <h2>UH OH! You're lost.</h2>
                <p>The page you are looking for does not exist.
                How you got here is a mystery. But you can click the button below
                to go back to the homepage.
                </p>
                <button onClick={() => navigate("/")}>HOME</button>
            </div>
        </div>
    </>
  )
}

export default ErrorPage