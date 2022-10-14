import './App.css';
import React, {useState, useEffect} from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AboutUs from './pages/AboutUs';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import Welcome from './pages/Welcome';
import Home from './pages/Home';


function App() {

  const [ token, setToken] = useState({})

  useEffect(() => {
    setToken(JSON.parse(localStorage.getItem("token")))
  }, [])

  const updateToken = (token) => {
    localStorage.setItem("token", JSON.stringify(token))
    setToken(token)
  }

  return (
     <>
        <Router>
            <Routes>
                <Route exact path='/' element={
                  token ? <Home/> : <Welcome/>
                }/>  
                <Route path='/Dashboard' element={<Dashboard/>}/>
                <Route path='/AboutUS' element={<AboutUs/>}/>
                <Route path='/Login' element={<Login updateToken={updateToken}/>}/>                           
                <Route path='/Register' element={<Register/>}/>
                <Route path='/forgotPassword' element={<ForgotPassword/>}/>
            </Routes>
          </Router> 
     </>
  );
}


export default App;
