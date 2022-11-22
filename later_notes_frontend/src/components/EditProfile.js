import React, { useState, useEffect } from "react"
import "../style/EditProfile.css"
import axios from "axios"
import { useNavigate } from "react-router";

const EditProfile = () => {

    const userData = JSON.parse(localStorage.getItem('user')).user;
    const token = JSON.parse(localStorage.getItem('user')).token;

    const navigate = useNavigate();

    const initialValue = {
        id: null,
        username: userData.username,
        email: userData.email,
        address: "",
        phone: "",
        city: "",
        state: "",
        photo: "",

    }

    const [userDetail, setUserDetail] = useState(initialValue)
    const [formErrors, setFormErrors] = useState({})
    const [profileImg, setProfileImg] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png")
    const [edit, setEdit] = useState(true);

    const callFn = async () => {
        const response = await axios({
            url: "http://localhost:3001/userDetails",
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        if (response.data.data[0] !== undefined) {
            setUserDetail(
                {
                    id: response.data.data[0].id,
                    username: response.data.data[0].username,
                    email: response.data.data[0].email,
                    address: response.data.data[0].address,
                    phone: response.data.data[0].phone,
                    city: response.data.data[0].city,
                    state: response.data.data[0].state,
                    photo: response.data.data[0].photo
                });
        }
    };

    useEffect(() => {
        callFn();
    }, []);

    useEffect(() => {
        callFn();
    }, [setUserDetail]);

    const validateForm = (values) => {
        let errors = {}
        let formIsValid = true;
        let regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        let regexPhone = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/

        if (!values.username) {
            formIsValid = false;
            errors.username = "Username is required!";
        }

        if (!values.email) {
            formIsValid = false;
            errors.email = "Email is required!";
        } else if (!regexEmail.test(values.email)) {
            formIsValid = false;
            errors.email = "This is not a valid email format!";
        }

        if (!values.phone) {
            formIsValid = false;
            errors.phone = "Password is required";
        } else if (!regexPhone.test(values.phone)) {
            formIsValid = false;
            errors.phone = "This is not a valid phone number";
        }

        if (!values.address) {
            formIsValid = false;
            errors.address = "Confirm Password is required";
        }

        if (!values.city) {
            formIsValid = false;
            errors.city = "Confirm Password is required";
        }

        if (!values.state) {
            formIsValid = false;
            errors.state = "Confirm Password is required";
        }

        if (!values.state) {
            formIsValid = false;
            errors.image = "Image is required";
        }

        setFormErrors(errors)
        return formIsValid
    };

    const handleSave = async (e) => {
        e.preventDefault();
        if (validateForm(userDetail)) {
            saveInfo();
        }
        setEdit(true);
    }

    const handleEdit = (e) => {
        e.preventDefault();
        setEdit(false);
    };

    const handleChange = e => {
        const { name, value } = e.target
        setUserDetail({
            ...userDetail,
            [name]: value
        })
    }

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

        setUserDetail({
            ...userDetail,
            photo: e.target.files[0]
        })

        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setProfileImg(reader.result)
            }
        }
        reader.readAsDataURL(imageFile)
    };

    const saveInfo = async (e) => {
        try {
            let formData = new FormData();
            Object.keys(userDetail).forEach(item => {
                formData.append(item, userDetail[item]);
            })
            if (userDetail.id === null) {
                const response = await axios({
                    method: "POST",
                    url: "http://localhost:3001/userDetails",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    data: formData
                })

                setUserDetail({
                    id: response.data.data.id,
                    username: response.data.data.username,
                    email: response.data.data.email,
                    address: response.data.data.address,
                    phone: response.data.data.phone,
                    city: response.data.data.city,
                    state: response.data.data.state,
                    photo: response.data.data.photo,
                });
                alert(response.data.message)
            }
            else {
                const response = await axios({
                    method: "PUT",
                    url: "http://localhost:3001/userDetails",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    data: formData
                })
                setUserDetail({
                    id: response.data.data.id,
                    username: response.data.data.username,
                    email: response.data.data.email,
                    address: response.data.data.address,
                    phone: response.data.data.phone,
                    city: response.data.data.city,
                    state: response.data.data.state,
                    photo: response.data.data.photo,
                });
                alert(response.data.message)
            }
            navigate("/MyNotes")
        }
        catch (error) {
            alert(error.response.data.error);
        }
    }



    return (
        <>
            <div className='editProfile'>
                <div className='editProfileContent'>
                    {userDetail.id != null ?
                        <form className="userData">
                            <h2>User Profile</h2>
                            <div className="ProfileImage">
                                <img src={userDetail.photo} alt="" />
                                <br />
                                <label className="photo" htmlFor="input" >upload</label>
                                <input type="file" name="photo" id="input" onChange={imageHandler} disabled={edit} required />
                                <p className="error">{formErrors.image}</p>
                            </div>
                            <div className="userDetail">
                                <div className="Inline">
                                    <label className="UserNameLabel">Name : </label>
                                    <br />
                                    <input className="UserNameInput" type="text" name="username" value={userDetail.username} onChange={handleChange} disabled={edit} required></input>
                                    <p className="error">{formErrors.username}</p>
                                </div>
                                <div className="Inline">
                                    <label className="UserEmailLabel">Email : </label>
                                    <br />
                                    <input className="UserEmailInput" type="text" name="email" value={userDetail.email} onChange={handleChange} disabled={edit} required></input>
                                    <p className="error">{formErrors.email}</p>
                                </div>
                                <div className="Inline">
                                    <label className="UserAddLabel">Address : </label>
                                    <br />
                                    <textarea className="UserAddInput" type="text" name="address" value={userDetail.address} onChange={handleChange} disabled={edit} required></textarea>
                                    <p className="error">{formErrors.address}</p>
                                </div>
                                <div className="Inline">
                                    <label className="UserPhoneLabel">Phone No : </label>
                                    <br />
                                    <input className="UserPhoneInput" type="tel" name="phone" value={userDetail.phone} onChange={handleChange} disabled={edit} required></input>
                                    <p className="error">{formErrors.phone}</p>
                                </div>
                                <div className="Inline">
                                    <label className="UserCityLabel">City : </label>
                                    <br />
                                    <input className="UserCityInput" type="text" name="city" value={userDetail.city} onChange={handleChange} disabled={edit} required></input>
                                    <p className="error">{formErrors.city}</p>
                                </div>
                                <div className="Inline">
                                    <label className="UserStateLabel">State : </label>
                                    <br />
                                    <input className="UserStateInput" type="text" name="state" value={userDetail.state} onChange={handleChange} disabled={edit} required></input>
                                    <p className="error">{formErrors.state}</p>
                                </div>
                                <div className="SaveBtn">
                                    {edit === true ? (
                                        <button className="save" type="button" onClick={handleEdit}>Edit</button>
                                    ) : (
                                        <button className="save" type="button" onClick={handleSave}>Save</button>
                                    )}
                                </div>
                            </div>
                        </form>
                        :
                        <form className="userData">
                            <h2>User Profile</h2>
                            <div className="ProfileImage">
                                <img src={profileImg} alt="" />
                                <br />
                                <label className="photo" htmlFor="input" >upload</label>
                                <input type="file" name="photo" id="input" onChange={imageHandler} required />
                                <p className="error">{formErrors.image}</p>
                            </div>
                            <div className="userDetail">
                                <div className="Inline">
                                    <label className="UserNameLabel">Name : </label>
                                    <br />
                                    <input className="UserNameInput" type="text" name="username" value={userDetail.username} onChange={handleChange} required></input>
                                    <p className="error">{formErrors.username}</p>
                                </div>
                                <div className="Inline">
                                    <label className="UserEmailLabel">Email : </label>
                                    <br />
                                    <input className="UserEmailInput" type="text" name="email" value={userDetail.email} onChange={handleChange} required></input>
                                    <p className="error">{formErrors.email}</p>
                                </div>
                                <div className="Inline">
                                    <label className="UserAddLabel">Address : </label>
                                    <br />
                                    <textarea className="UserAddInput" type="text" name="address" value={userDetail.address} onChange={handleChange} required></textarea>
                                    <p className="error">{formErrors.address}</p>
                                </div>
                                <div className="Inline">
                                    <label className="UserPhoneLabel">Phone No : </label>
                                    <br />
                                    <input className="UserPhoneInput" type="tel" name="phone" value={userDetail.phone} onChange={handleChange} required></input>
                                    <p className="error">{formErrors.phone}</p>
                                </div>
                                <div className="Inline">
                                    <label className="UserCityLabel">City : </label>
                                    <br />
                                    <input className="UserCityInput" type="text" name="city" value={userDetail.city} onChange={handleChange} required></input>
                                    <p className="error">{formErrors.city}</p>
                                </div>
                                <div className="Inline">
                                    <label className="UserStateLabel">State : </label>
                                    <br />
                                    <input className="UserStateInput" type="text" name="state" value={userDetail.state} onChange={handleChange} required></input>
                                    <p className="error">{formErrors.state}</p>
                                </div>
                                <div className="SaveBtn">
                                    <button className="save" type="button" onClick={handleSave}>Save</button>
                                </div>
                            </div>
                        </form>
                    }
                </div>
            </div>
        </>
    )
}

export default EditProfile