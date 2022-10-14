import React, {useState} from "react"
import "../style/SideNav.css"

const SideNav = () => {

  const [ profileImg, setProfileImg] = useState('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png')
  const user = JSON.parse(localStorage.getItem('token'));
  
  const imageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () =>{
      if(reader.readyState === 2){
        setProfileImg(reader.result)
      }
    }
    reader.readAsDataURL(e.target.files[0])
  };

	return (
    <>
      <div className='UserProfile'>
        <div className="img-holder">
					<img src={profileImg} alt=""/> 
				</div>  
					<div className="label">
            <label className="image-upload" htmlFor="input">upload</label> 
            <input type="file" accept="image/*" name="image-upload" id="input" onChange={imageHandler} />  
          </div>  
        {/* <h2 className="UserName"><b> Unkown </b></h2>  */}
        {
          user ? 
          <div className="userDetail">
            <input type="text" name="username" defaultValue={user[0].username}></input> {/*defaultValue={transcript}*/}
            <br/>
            <input type="text" name="email" defaultValue={user[0].email}></input>
          </div>
          : <h2 className="UserName"><b> Unkown </b></h2>
        }
      </div>  
		</>
	);
}

export default SideNav;


// export class SideNav extends Component {
//   state={
//     profileImg:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
//   }
//   imageHandler = (e) => {
//     const reader = new FileReader();
//     reader.onload = () =>{
//       if(reader.readyState === 2){
//         this.setState({profileImg: reader.result})
//       }
//     }
//     reader.readAsDataURL(e.target.files[0])
//   };

// 	render() {
//     const { profileImg} = this.state
// 		return (
//     <>
//       <div className='UserProfile'>
    
//         <div className="img-holder">
// 					<img src={profileImg} alt=""/> 
// 				</div> 
//         <input type="file" accept="image/*" name="image-upload" id="input" onChange={this.imageHandler} />
// 					<div className="label">
//             <label className="image-upload" htmlFor="input">upload</label>   
//           </div>  
//         <h2 className="UserName"><b> Unkown </b></h2> 
//       </div> 
// 		</>
		
// 		);
// 	}
// }

// export default SideNav;

