import './App.css';
import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AboutUs from './components/AboutUs';
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import Welcome from './components/Welcome';
import Home from './components/Home';
import ErrorPage from './components/ErrorPage';
import Notes from './components/Notes';
import DeleteNotes from './components/DeleteNotes';
import { EditNotes } from './components/EditNotes';
import EditProfile from './components/EditProfile';
import DownloadFile from './components/DownloadFile';
import ShareNotes from './components/ShareNotes';
import io from 'socket.io-client'

let socket;
const CONNECTION_PORT = "http://localhost:3001/";

function App() {

  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setCurrentUser(user);
      socket = io(CONNECTION_PORT);
    }
  }, []);


  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/' element={
            currentUser ? <Home /> : <Welcome />
          } />
          <Route path='/Register' element={<Register />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/forgotPassword' element={<ForgotPassword />} />
          <Route path='/Dashboard' element={<Dashboard />} />
          <Route path='/AboutUS' element={<AboutUs />} />
          <Route path='/MyNotes' element={<Notes />} />
          <Route path="/DeleteNote/:id" element={<DeleteNotes />} />
          <Route path="/EditNote/:id" element={<EditNotes socket={socket} />} />
          <Route path="/DownloadNote/:id" element={<DownloadFile/>} />
          <Route path="/ShareNote/:id" element={<ShareNotes/>} />
          <Route path='/UserProfile' element={<EditProfile/>} />
          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </Router>
    </>
  );
}


export default App;
