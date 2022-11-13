import React, { useState, useRef } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import SideNav from './SideNav';
import Footer from './Footer';
import TopNav from './TopNav';
import axios from "axios"
import "../style/Dashboard.css"

const Dashboard = () => {

    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")

    const editorRef = useRef(null);

    const token = JSON.parse(localStorage.getItem('user')).token

    const addNotesHandler = async (e) => {
        try {
            e.preventDefault()
            if (title !== "" && desc !== "") {
                const response = await axios({
                    method: "POST",
                    url: "http://localhost:3001/dashboard",
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
            }
        }
        catch (error) {
            console.log(error)
            alert(error.response.data.error);
        }
        setTitle("")
        setDesc("")
    }

    return (
        <>
            <TopNav />
            <SideNav />
            <div className="Dashboard">
                <div className="input">
                    <div className='Notetitle'>
                        <label className='title'>Title</label>
                        <br />
                        <input type="text" className='titleName' id='title' value={title} onChange={(e) => { setTitle(e.target.value) }} />
                    </div>
                    <div className="button">
                        <button id="Save-btn" onClick={addNotesHandler}>
                            <img src={require('../icons/rename.png')} alt="SaveButton" height="30" width="30" />
                            <span>Save File</span>
                        </button>
                        <button id="clr-btn" onClick={() => { setDesc("") }}>
                            <img src={require('../icons/clear.png')} alt="ClearButton" height="30" width="30" />
                            <span>Clear</span>
                        </button>
                    </div>
                    <br />
                    <br />
                    <br />
                    <div className='NoteContext'>
                        <label className='Description'>Description</label>
                        <br />
                        <Editor
                            apiKey='1b5cb4qrcsiq9xr8f383n12uwq9hudpvukvqqacwewrnbu8s'
                            onInit={(evt, editor) => editorRef.current = editor}
                            value={desc}
                            onEditorChange={(newtext) => { setDesc(newtext) }}
                            init={{
                                height: 380,
                                menubar: 'file edit view insert format tc',
                                toolbar: 'undo redo | formatselect | ' +
                                    'bold italic backcolor | alignleft aligncenter ' +
                                    'alignright alignjustify | bullist numlist outdent indent | ' +
                                    'removeformat | help',
                                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                            }}
                        />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Dashboard
