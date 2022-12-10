import React, { useState } from 'react'
import SideNav from './SideNav';
import TopNav from './TopNav';
import axios from "axios"
import "../style/Dashboard.css"
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5-custom-build/build/ckeditor';

const appData = {
    users: [
        {
            id: 'user-1',
            name: "Mansi Trivedi",
        },
        {
            id: 'user-2',
            name: 'Rani Gupta'
        }
    ]
};


const Dashboard = () => {

    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")

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
        }
        setTitle("")
        setDesc("")
    }

    const handleChange = (e, editor) => {
        let data = editor.getData();
        setDesc(data)
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
                        <button id="clr-btn" onClick={() => { 
                            setDesc("") 
                            setTitle("")
                    }}>
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
                        <div className='editor'>
                            <CKEditor
                                data={desc}
                                onChange={handleChange}
                                editor={Editor}
                                config={{
                                    extraPlugins: [TrackChangesIntegration],
                                    exportPdf: {
                                        stylesheets: ['EDITOR_STYLES'],
                                        fileName: 'demo.pdf',
                                        converterUrl: 'https://pdf-converter.cke-cs.com/v1/convert',
                                        converterOptions: {
                                            format: 'A4',
                                            margin_top: '0mm',
                                            margin_bottom: '0mm',
                                            margin_right: '0mm',
                                            margin_left: '0mm',
                                            page_orientation: 'portrait',
                                            header_html: undefined,
                                            footer_html: undefined,
                                            header_and_footer_css: undefined,
                                            wait_for_network: true,
                                            wait_time: 0
                                        }
                                    },
                                    exportWord: {
                                        fileName: 'document.docx',
                                        converterUrl: 'https://docx-converter.cke-cs.com/v1/convert',
                                        stylesheets: ['EDITOR_STYLES'],
                                        converterOptions: {
                                            format: 'A4',
                                            margin_top: '1in',
                                            margin_bottom: '1in',
                                            margin_right: '1in',
                                            margin_left: '1in',
                                            header: undefined,
                                            footer: undefined,
                                            comments: undefined,
                                            suggestions: undefined,
                                            orientation: 'portrait'
                                        },
                                    },
                                    licenseKey: '8IaxBmSPg7BqjT7H84CPrzQpNcaip4P9ScPSA2mdBv7DrFvF4ml+UXtbYg=='
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard

class TrackChangesIntegration {
  constructor(editor) {
    this.editor = editor;
  }

  init() {
    const usersPlugin = this.editor.plugins.get('Users');
    const trackChangesPlugin = this.editor.plugins.get('TrackChanges');
    const commentsRepositoryPlugin = this.editor.plugins.get('CommentsRepository');

    for (const user of appData.users) {
      usersPlugin.addUser(user);
    }

    usersPlugin.defineMe( 'user-1' );

    trackChangesPlugin.adapter = {
      getSuggestion: suggestionId => {

        console.log('Get suggestion', suggestionId);

        return axios({
            url: `http://localhost:3001/suggestion/${suggestionId}`,    //Get Suggestion
            method: "GET",
          })
					.then( res => {
            let suggestion = {}
            suggestion.id = res.data.data[0].id
            suggestion.type = res.data.data[0].type
						suggestion.createdAt = new Date(res.data.data[0].createdAt);
            suggestion.authorId = res.data.data[0].userId;
            suggestion.hasComments = !!parseInt( res.data.data[0].hasComments );
            console.log(suggestion)
						  return suggestion; 
					} );
      },

      addSuggestion: suggestionData => {

        console.log( 'Suggestion added', suggestionData );

        let data = {}
        data.id = suggestionData.id
        data.type = suggestionData.type
        data.data = JSON.stringify( suggestionData.data )
        data.hasComments = suggestionData.hasComments
        data.userId = 'user-1'

				if ( suggestionData.originalSuggestionId ) {
					data.originalSuggestionId = suggestionData.originalSuggestionId 
				}
        
				return axios({                   
          method: "POST",
          url: "http://localhost:3001/suggestion",
          data: data
        })
					.then( response => {
						return {
							createdAt: new Date()
						};
					} );
			},

      updateSuggestion: (id, suggestionData) => {
        console.log( 'Suggestion updated', id, suggestionData );

        let data = {}

				if ( suggestionData.hasComments !== undefined ) {
					data.hasComments = suggestionData.hasComments ;
				}

				if ( suggestionData.state !== undefined ) {
					data.state = suggestionData.state ;
				}

				return axios({                         //Update Suggestion
           method: "PUT",
           url: `http://localhost:3001/suggestion/${id}`,
           data: suggestionData
        }).then( response => console.log(response))
        .catch(error => console.log(error))
			}
    };

    commentsRepositoryPlugin.adapter = {
      getCommentThread: ({ threadId }) => {

        console.log('Get comment thread', threadId);

        return axios({
          url: `http://localhost:3001/comment/${threadId}`,
          method: "GET"
        })
        .then((res) => {
          let comment = {}
          comment.threadId = threadId
          comment.comments = [
              { commentId: res.data.data[0].commentId, content: res.data.data[0].content, authorId: res.data.data[0].userId, createdAt: new Date(res.data.data[0].createdAt)}
            ]
          return comment
        }).catch((err) => {
          console.log(err)
        })

      },
      addComment: data => {

        console.log('Comment added', data);

        let commentData = {}
        commentData.threadId = data.threadId
        commentData.commentId = data.commentId
        commentData.content = data.content
        commentData.userId = 'user-1'

        return axios({
          method: "POST",
          url: "http://localhost:3001/comment",
          data: commentData
        })
        .then( response => {
          return {
            createdAt: new Date()
          };
        } ).catch((err) => {
          console.log(err)
        })
      },

      updateComment: data => {

        console.log('Comment updated', data);

        let commentData = {}
        commentData.content = data.content

        return axios({
          method: "PUT",
          url: `http://localhost:3001/comment/${data.commentId}/${data.threadId}`,
          data: commentData
        }).then((res) => {
          console.log(res)
        }).catch((err) => {
          console.log(err)
        })
      },
      
      removeComment: data => {
        console.log('Comment removed', data);

        return axios({
          method: "DELETE",
          url: `http://localhost:3001/comment/${data.commentId}/${data.threadId}`,
        }).then((res) => {
          console.log(res)
        }).catch((err) => {
          console.log(err)
        })
        
      },
    };
  }
}