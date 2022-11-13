import React, { useState } from "react"
import "../style/Register.css"
import {useNavigate} from "react-router-dom"
import axios from "axios"

const Register = () => {

    const navigate = useNavigate();

    const initialValue = {
        username: "",
        email:"",
        password:"",
        reEnterPassword: "",
    }

    const [ formValues, setFormValues] = useState(initialValue)
    const [ formErrors, setFormErrors] = useState({})

    const handleChange = e => {
        const { name, value } = e.target
        setFormValues({
            ...formValues,
            [name]: value
        })
    }
      
    const validateForm = (values) => {
        let errors = {}
        let formIsValid = true;
        let regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

        if (!values.username) {
            formIsValid = false;
            errors.username = "Username is required!";
        }

        if (!values.email) {
            formIsValid = false;
            errors.email = "Email is required!";
        } else if (!regex.test(values.email)) {
            formIsValid = false;
            errors.email = "This is not a valid email format!";
        }

        if (!values.password) {
            formIsValid = false;
            errors.password = "Password is required";
        } else if (values.password.length < 4) {
            formIsValid = false;
            errors.password = "Password must be more than 4 characters";
        } else if (values.password.length > 10) {
            formIsValid = false;
            errors.password = "Password cannot exceed more than 10 characters";
        }

        if (!values.reEnterPassword) {
            formIsValid = false;
            errors.reEnterPassword = "Confirm Password is required";
        }else if(values.password !== values.reEnterPassword){
            formIsValid = false;
            errors.reEnterPassword = "Confirm Password must be same as Password";
        }

        setFormErrors(errors)
        return formIsValid
    };


    const register = async() => {
        try{
            if (validateForm(formValues)) {
                const response = await axios.post("http://localhost:3001/register", formValues)
                alert(response.data.message)
                navigate("/Login")
            }
        }
        catch(error){
            alert(error.response.data.error);
        }
    }

    return (
        <div className="Register">
            <div className="registerForm">
                <h1>Register</h1>
                <input type="text" name="username" value={formValues.username} placeholder="username" onChange={ handleChange }></input>
                <p className="error">{formErrors.username}</p>   
                <input type="text" name="email" value={formValues.email} placeholder="Email" onChange={ handleChange }></input>
                <p className="error">{formErrors.email}</p>
                <input type="password" name="password" value={formValues.password} placeholder="Password" onChange={ handleChange }></input>
                <p className="error">{formErrors.password}</p>
                <input type="password" name="reEnterPassword" value={formValues.reEnterPassword} placeholder="Re-enter Password" onChange={ handleChange }></input>
                <p className="error">{formErrors.reEnterPassword}</p>
                <button className="registerButton" onClick={register} >Register</button>
                <p className="alreadyAccount" onClick={() => navigate("/Login")}>already have Account? LOGIN</p>
            </div>
        </div>
    )
}

export default Register