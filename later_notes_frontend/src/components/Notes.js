import React, { useState, useEffect } from "react"
import "../style/Notes.css"
import TopNav from "./TopNav";
import SideNav from "./SideNav";
import Footer from "./Footer";
import axios from "axios"
import { Link } from "react-router-dom";
import Accordion from 'react-bootstrap/Accordion';

const Notes = () => {

    const [noteList, setNoteList] = useState([]);
    const token = JSON.parse(localStorage.getItem('user')).token

    const callFn = async () => {
        try {
            const response = await axios.get('http://localhost:3001/MyNotes', {
                headers: { Authorization: `Bearer ${token}` },
            })
            setNoteList(response.data.data);

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
    }, [setNoteList]);


    return (
        <>
            <TopNav />
            <SideNav />
            <div className='myNotes'>
                {!noteList ||
                    (noteList.length === 0 && (
                        <h2 className="NoNotesFound">No Notes Found</h2>
                    ))}
                <div className='myNotesList'>
                    <div className="row">
                        {noteList && (
                            <>
                                {noteList.map((note) =>
                                <div className="accordionList" key={note.id}> 
                                    <Accordion>
                                        <Accordion.Item eventKey="0">
                                            <Accordion.Header>
                                                <div className="NotesTitle">
                                                {note.title}
                                                </div>
                                                <div className="NoteButton">
                                                    <Link to={`/EditNote/${note.id}`}>
                                                        <button className="EditButton">edit</button>
                                                    </Link>
                                                    <Link to={`/DownloadNote/${note.id}`}>
                                                        <button className="DownloadNote">Download</button>
                                                    </Link>
                                                    <Link to={`/DeleteNote/${note.id}`}>
                                                        <button className="RemoveButton" >Remove</button>
                                                    </Link>
                                                </div>
                                            </Accordion.Header>
                                            <Accordion.Body dangerouslySetInnerHTML={{ __html: note.desc }}/>
                                        </Accordion.Item>
                                    </Accordion>
                                </div>
                                )}

                            </>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Notes;


/*{noteList.map((note) =>
                                    <div key={note.id} className="col-sm-6">
                                        <div className="card">
                                            <div className="card-body">
                                                <h5 className="card-title">{note.title}</h5>
                                                <div className="card-text" dangerouslySetInnerHTML={{ __html: note.desc }} />
                                                <div className="NoteButton">
                                                    <Link to={`/EditNote/${note.id}`}>
                                                        <button className="EditButton">edit</button>
                                                    </Link>
                                                    <Link to={`/DownloadNote/${note.id}`}>
                                                        <button className="DownloadNote">Download</button>
                                                    </Link>
                                                    <Link to={`/DeleteNote/${note.id}`}>
                                                        <button className="RemoveButton" >Remove</button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}*/
