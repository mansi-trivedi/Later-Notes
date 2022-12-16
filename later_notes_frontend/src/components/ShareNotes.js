import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router";
import axios from 'axios';
import "../style/ShareNotes.css"
import { Multiselect } from 'multiselect-react-dropdown'

const ShareNotes = () => {
    const [userList, setUserList] = useState();
    const [selectedUser, setSelectedUser] = useState();

    const token = JSON.parse(localStorage.getItem('user')).token
    const { id } = useParams();
    const navigate = useNavigate();

    const callFn = async () => {
        try {
            const response = await axios.get('http://localhost:3001/users', {
                headers: { Authorization: `Bearer ${token}` },
            })
            setUserList(response.data.data);

        }
        catch (error) {
            alert(error.response.data.error);
        }
    };

    useEffect(() => {
        callFn();
    }, []);

    useEffect(() => {
        callFn();
    }, [setUserList]);

    const onSelect = (data) => {
        setSelectedUser(data)
    }

    const onRemove = (data) => {
        setSelectedUser(data)
    }

    const handleSend = async() => {
        try {
            console.log(selectedUser)
            const response = await axios({
                url: `http://localhost:3001/sharedNote/${id}`,
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                data: selectedUser
            })
            alert(response.data.message)
            navigate("/MyNotes")
        }
        catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className="ShareBody">
                <div className="ShareTask">
                    <h2 className="ShareQuestion">
                        Share with
                    </h2>
                    <div className="ShareWith">
                        <Multiselect
                            options={userList}
                            displayValue="username"
                            onSelect={onSelect}
                            onRemove={onRemove}
                        />
                    </div>
                    <div className='ShareButton'>
                        <button onClick={handleSend} className='share'>Send</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ShareNotes