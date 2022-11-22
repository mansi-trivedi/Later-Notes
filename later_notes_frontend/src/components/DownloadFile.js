import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Accordion from 'react-bootstrap/Accordion';
import ReactDOMServer from "react-dom/server";
import htmlDocx from 'html-docx-js/dist/html-docx'
import { saveAs } from 'file-saver'
import jsPDF from 'jspdf'
import axios from "axios";
import "../style/DownloadFile.css"

const DownloadFile = () => {

    const [downloadNote, setDownloadNote] = useState({});

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
            setDownloadNote(response.data.data[0]);

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
    }, [setDownloadNote]);


    const downloadWord = () => {
        let htmlDoc = downloadNote.desc;
        let converted = htmlDocx.asBlob(htmlDoc);
        let filename = document.getElementById("downloadName").value + '.docx'
        saveAs(converted, filename);
        navigate("/MyNotes")
    }

    const downloadTxt = () => {
        const filename = document.getElementById("downloadName").value + '.txt'
        const content = downloadNote.desc
        const myContent = content.replace(/<[^>]+>/g, "");
        const element = document.createElement('a');
        const blob = new Blob([myContent], { type: 'plain/text' });
        const fileUrl = URL.createObjectURL(blob);
        element.setAttribute('href', fileUrl); 
        element.setAttribute('download', filename);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();

        document.body.removeChild(element);
        navigate("/MyNotes")
    }

    const downloadPdf = () => {
        let html_element  = (
            <div style={{width:"1350px", margin:"20px"}} dangerouslySetInnerHTML={{ __html: downloadNote.desc }}/>
          );
        const filename = document.getElementById("downloadName").value
        const doc = new jsPDF({
            format: 'a4',
            unit: 'px', 
        });
        doc.html(ReactDOMServer.renderToString(html_element), {
            async callback(doc) {
                await doc.save(filename);
            },
        });
    }

    return (
        <>
            <div className="DownloadBody">
                <div className="DownloadTask">
                    <h2 className="downloadQuestion">you want to Download</h2>
                    <div className="DownloadNoteTitle" id="downloadTitle">
                        {downloadNote.title}
                    </div> 
                        <div className="DownloadBtns">
                            <input id="downloadName" defaultValue={downloadNote.title} />
                            <DropdownButton size="sm" id="dropdown-basic-button" title="Download" >
                                <Dropdown.Item onClick={() => { downloadWord() }}><strong>docx</strong></Dropdown.Item>
                                <Dropdown.Item onClick={() => { downloadPdf() }}><strong>pdf</strong></Dropdown.Item>
                                <Dropdown.Item onClick={() => { downloadTxt() }}><strong>txt</strong></Dropdown.Item>
                            </DropdownButton>
                        </div>
                </div>
            </div>
        </>
    )
}

export default DownloadFile
