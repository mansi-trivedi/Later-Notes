import React, {useState} from "react"
import "../style/SideNav.css"

const SideNav = () => {

  const user = JSON.parse(localStorage.getItem('user'));

  const [ profileImg, setProfileImg] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png")
  
  const imageHandler = (e) => {
    const imageFile = e.target.files[0]
    if (!imageFile) {
      alert('Please select image.');
      return false;
    }
     
    if (!imageFile.name.match(/\.(jpg|jpeg|png|gif)$/)) {
      alert('Please select valid image.');
      return false;
    }

    const reader = new FileReader();
    reader.onload = () =>{
      if(reader.readyState === 2){
        setProfileImg(reader.result)
      }
    }
    reader.readAsDataURL(imageFile)
  };

	return (
    <>
      <div className='UserProfile'>
        <div className="img-holder">
					<img src={profileImg} alt=""/> 
				</div>  
					<div className="label">
            <label className="image-upload" htmlFor="input">upload</label> 
            <input type="file" name="image-upload" id="input" onChange={imageHandler} />  
          </div>  
        {/* <h2 className="UserName"><b> Unkown </b></h2>   */}
        {
          user ? 
          <div className="userDetail">
            <input type="text" name="username" defaultValue={user.user[0].username}></input>
            <br/>
            <input type="text" name="email" defaultValue={user.user[0].email}></input>
          </div>
          : <h2 className="UserName"><b> Unkown </b></h2>
        }
      </div>  
		</>
	);
}

export default SideNav;


