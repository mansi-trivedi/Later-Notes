import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import "../style/DeleteNotes.css"


const DeleteNotes = () => {
    const [deleteNote, setDeleteNote] = useState({});

    const { id } = useParams();

    const navigate = useNavigate();

    const token = JSON.parse(localStorage.getItem('user')).token

    const callFn = async () => {
        try {
            const response = await axios({
                url: `http://localhost:3001/MyNotes/${id}`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            setDeleteNote(response.data.data[0]);

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
    }, [setDeleteNote]);

    const handleYesDelete = async () => {
        try {
            const response = await axios({
                url: `http://localhost:3001/MyNotes/${id}`,

                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            alert(response.data.message)
            navigate("/MyNotes")
        }
        catch (error) {
            alert(error.response.data.error);
        }
    };

    const handleNoDelete = () => {
        navigate("/MyNotes");
    };

    return (
        <div className="DeleteBody">
            <div className="DeleteTask">
                <h2 className="DelQuestion">
                    Are you sure you want to delete?
                </h2>
                <div className="DelNoteContent">{deleteNote.title}</div>
                <div className="DeleteBtns">
                    <button
                        onClick={handleNoDelete}
                        className="NoDeleteButton DeleteButton"
                    >
                        No
                    </button>
                    <button
                        onClick={handleYesDelete}
                        className="YesDeleteButton DeleteButton"
                    >
                        Yes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteNotes;

