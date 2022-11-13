import axios from "axios";
import React, { useState, useEffect } from "react";
import "../style/SideNav.css"
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const SideNav = () => {

  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem('user')).token

  const [profileImg, setProfileImg] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png")

  const callFn = async () => {
    try {
      const response = await axios({
        url: "http://localhost:3001/userDetails",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if(response.data.data.length != 0){
        setProfileImg(response.data.data[0].photo);
      }
    }
    catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    callFn();
  }, []);

  useEffect(() => {
    callFn();
  }, [setProfileImg]);

  return (
    <>
      <div className='UserData'>
        <div className="img-holder">
          <img src={profileImg} alt="" onClick={() => navigate("/EditProfile")} />
        </div>
        <div className="user-name">
          <Link to={"/UserProfile"}>
            <button>My Profile</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default SideNav;


