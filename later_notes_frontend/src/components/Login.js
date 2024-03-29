import React, {useState} from "react"
import "../style/Login.css"
import {useNavigate} from "react-router-dom"
import axios from "axios"


const Login = () => {
    const navigate = useNavigate(); 

    const initialValue = {
        email:"",
        password:""
    }

    const [ user, setUser] = useState(initialValue)
    const [ loginErrors, setLoginErrors] = useState({})

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    };

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
        setLoginErrors(errors)
        return formIsValid
    };

    const login = async () => {
        try{
            if (validateForm(user)) {
                const response = await axios.post("http://localhost:3001/login", user)
                if (response.data.token) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }
                alert(response.data.message)
                navigate("/")
                window.location.reload();
                
            }
        }
        catch(error){
            alert(error.response.data.error);
        }
    }

    return (
        <div className="Login">
            <div className="loginForm">
                <h1>LOGIN</h1>
                <input type="text" name="email" value={user.email} onChange={handleChange} placeholder="Email"></input>
                <p className="error">{loginErrors.email}</p>
                <input type="password" name="password" value={user.password} onChange={handleChange}  placeholder="Password" ></input>
                <p className="error">{loginErrors.password}</p>
                <p className="forgotPassword" onClick={() => navigate("/ForgotPassword")}>Forgot Password?</p>
                <button className="loginButton" onClick={login}>Login</button>
                <p className="notHaveAccount" onClick={() => navigate("/Register")}>Need an Account? SIGN UP</p>
            </div>
        </div>
    )
}

export default Login