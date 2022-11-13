import React, {useState} from "react"
import "../style/ForgotPassword.css"
import {useNavigate} from "react-router-dom"
import axios from "axios"

const ForgotPassword = () => {

    const navigate = useNavigate();

    const initialValue = {
        email:"",
        password:"",
        reEnterPassword:""
    }

    const [ userPassword, setUserPassword] = useState(initialValue)
    const [ PasswordErrors, setPasswordErrors] = useState({})


    const handleChange = e => {
        const { name, value } = e.target
        setUserPassword({
            ...userPassword,
            [name]: value
        })
    }

    const validateForm = (values) => {
        let errors = {}
        let formIsValid = true;

        if (!values.email) {
            formIsValid = false;
            errors.email = "Email is required!";
        }

        if (!values.password) {
            formIsValid = false;
            errors.password = "Password is required";
            } 
        else if (values.password.length < 4) {
            formIsValid = false;
            errors.password = "Password must be more than 4 characters";
            } 
        else if (values.password.length > 10) {
            formIsValid = false;
            errors.password = "Password cannot exceed more than 10 characters";
        }
    
        if (!values.reEnterPassword) {
            formIsValid = false;
            errors.reEnterPassword = "Confirm Password is required";
        }
        else if(values.password !== values.reEnterPassword){
            formIsValid = false;
            errors.reEnterPassword = "Confirm Password must be same as Password";
        }
        setPasswordErrors(errors)
        return formIsValid
    };

    const forgotpassword = async () => {
        try{
            if (validateForm(userPassword)) {
                const response = await axios.post("http://localhost:3001/forgotpassword", userPassword)
                alert(response.data.message)
                navigate("/Login")
            }
        }
        catch(error){
            alert(error.response.data.error);
        }
    }

    return (
        <div className="ForgotPassword">
            <div className="forgotPasswordForm">
                <h1>RESET PASSWORD</h1>
                <input type="email" name="email" value={userPassword.email} placeholder="email" onChange={ handleChange }></input>
                <p className="error">{PasswordErrors.email}</p>
                <input type="password" name="password" value={userPassword.password} placeholder="Password" onChange={ handleChange }></input>
                <p className="error">{PasswordErrors.password}</p>
                <input type="password" name="reEnterPassword" value={userPassword.reEnterPassword} placeholder="Re-enter Password" onChange={ handleChange }></input>                {/* <p className="error">{PasswordErrors.ConfirmPassword}</p> */}
                <p className="error">{PasswordErrors.reEnterPassword}</p>
                <br></br>
                <button className="resetButton" onClick={forgotpassword}>Reset</button>
            </div>
        </div>
    )
}

export default ForgotPassword 