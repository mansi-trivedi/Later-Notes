import React from 'react'
import "../style/Dashboard.css"
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import SideNav from '../navigation/SideNav';
import Footer from '../footer/Footer';
import TopNav from '../navigation/TopNav';

const Dashboard = () => {
    const {transcript, resetTranscript, browserSupportsSpeechRecognition} = useSpeechRecognition();
    
      if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
      }

      const downloadTxtFile = () => {
        const element = document.createElement("a");
        const file = new Blob([document.getElementById('textbox').value],    
                    {type: 'text/plain;charset=utf-8'});
        element.href = URL.createObjectURL(file);
        element.download = "myFile.txt";
        document.body.appendChild(element);
        element.click();
      }

    return (
        <>
            <TopNav/>
            <SideNav/>
            <div className="Dashboard">
                <div className="input">
                    <textarea id="textbox" defaultValue={transcript}></textarea>
                </div>

                <div className="DashboardButton">
                    <div className="button">    
                        <button id="start-btn" onClick={SpeechRecognition.startListening}>
                            <img src={require('../icons/play.png')} alt="StartButton" height="30" width="30"/>
                            <span>Start</span>
                        </button>
                    </div>

                    <div className="button">    
                        <button id="end-btn" onClick={SpeechRecognition.stopListening}>
                            <img src={require('../icons/stop.png')} alt="StopButton" height="30" width="30"/>
                            <span>Stop</span>
                        </button>
                    </div>

                    <div className="button">    
                        <button id="clr-btn" onClick={resetTranscript}>
                            <img src={require('../icons/clear.png')} alt="ClearButton" height="30" width="30"/>
                            <span>Clear</span>
                        </button>   
                    </div>

                    <div className="button">    
                        <button id="save-btn" onClick={downloadTxtFile}>
                            <img src={require('../icons/download.png')} alt="DownloadButton" height="30" width="30"/>
                            <span>Download File</span>
                        </button> 
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default Dashboard
