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
import ErrorPage from './pages/ErrorPage';


function App() {

  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  return (
     <>
        <Router>
            <Routes>
                <Route exact path='/' element={
                  currentUser ? <Home/> : <Welcome/>
                }/>  
                <Route path='/Dashboard' element={<Dashboard/>}/>
                <Route path='/AboutUS' element={<AboutUs/>}/>
                <Route path='/Login' element={<Login/>}/>                         
                <Route path='/Register' element={<Register/>}/>
                <Route path='/forgotPassword' element={<ForgotPassword/>}/>
                <Route path='*' element={<ErrorPage/>}/>
            </Routes>
          </Router> 
     </>
  );
}


export default App;
