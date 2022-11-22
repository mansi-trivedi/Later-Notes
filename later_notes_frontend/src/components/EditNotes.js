import React, { useState, useRef, useEffect } from 'react'
import "../style/EditNotes.css"
import { Editor } from '@tinymce/tinymce-react';
import axios from "axios";
import { useNavigate, useParams } from "react-router";


export const EditNotes = () => {

    const editorRef = useRef(null);

    const [editNote, setEditNote] = useState({});

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
                        setEditNote(response.data.data[0]);

        }
        catch (error) {
            console.log(error)
            alert(error.response.data.error);
        }
    };

    useEffect(() => {
        callFn();
    }, []);

    useEffect(() => {
        callFn();
    }, [setEditNote]);

    const updateHandler = async () => {
        try {
            const title = document.getElementById('title').value;
            const desc = editorRef.current.getContent()
            const response = await axios({
                method: "PUT",
                url: `http://localhost:3001/MyNotes/${id}`,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                data: {
                    title: title,
                    desc: desc
                },
            })
            alert(response.data.message)
            navigate("/MyNotes")
        }
        catch (error) {
            alert(error.response.data.error);
        }
    }

    return (
        <>
            <div className="editNotes">
                <div className="editinput">
                    <h2 className="editQuestion">
                        Edit Note
                    </h2>
                    <div className='editNotetitle'>
                        <label className='edittitle'>Title</label>
                        <br />
                        <input type="text" className='edittitleName' id='title' defaultValue={editNote.title} />
                    </div>
                    <div className="editbutton">
                        <button id="Save-btn" onClick={updateHandler}>
                            <img src={require('../icons/rename.png')} alt="SaveButton" height="30" width="30" />
                            <span>Save File</span>
                        </button>
                    </div>
                    <br />
                    <br />
                    <br />
                    <div className='editNoteContext'>
                        <label className='editDescription'>Description</label>
                        <br />
                        <Editor
                            apiKey='1b5cb4qrcsiq9xr8f383n12uwq9hudpvukvqqacwewrnbu8s'
                            onInit={(evt, editor) => editorRef.current = editor}
                            initialValue={editNote.desc}
                            init={{
                                height: 380,
                                menubar: true,
                                toolbar: 'undo redo | formatselect | ' +
                                'bold italic backcolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | help',
                                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
