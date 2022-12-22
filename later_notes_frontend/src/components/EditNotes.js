import React from 'react';
import "../style/EditNotes.css"
import axios from "axios";
import { useNavigate, useLocation, useParams, matchPath } from "react-router";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5-custom-build/build/ckeditor';

const appData = {
  users: [
    {
      id: 'user-1',
      name: JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).user.username : "Demo"
    }
  ]
};

export class TrackChanges extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      editNote: {},
      editorData: ""
    }
    this.token = JSON.parse(localStorage.getItem('user')).token
    // this.pathname = this.props.path
    // this.isAdminPath = matchPath(`/EditNote/${this.props.params}`, this.pathname);
    this.handleChange = this.handleChange.bind(this);
    this.updateHandler = this.updateHandler.bind(this);

    this.sidebarElementRef = React.createRef();
  }

  async componentDidMount() {
    try {
      const response = await axios({
        url: `http://localhost:3001/MyNotes/${this.props.params}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
      this.setState({ editNote: response.data.data[0]})
    }
    catch (error) {
      console.log(error)
      alert(error.response.data.error);
    }
  }


  async updateHandler(editor) {
    try {
      const title = document.getElementById('title').value;
      const desc = this.state.editorData
      const response = await axios({
        method: "PUT",
        url: `http://localhost:3001/MyNotes/${this.props.params}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
        data: {
          title: title,
          desc: desc
        },
      })
      alert(response.data.message)
      this.props.navigate("/MyNotes")
    }
    catch (error) {
      alert(error.response.data.error);
    }
  }

  handleChange(e, editor) {
    let data = editor.getData();
    this.setState({ editorData: data })
  }

  render() {
    return (
      <>
        <div className="editNotes">
          {/* {this.isAdminPath? console.log('already open'): console.log('not open')} */}
          <div className="editinput">
            <h2 className="editQuestion">
              Edit Note
            </h2>
            <div className='editNotetitle'>
              <label className='edittitle'>Title</label>
              <br />
              <input type="text" className='edittitleName' id='title' defaultValue={this.state.editNote.title} />
            </div>
            <div className="editbutton">
              <button id="Save-btn" onClick={this.updateHandler}>
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
              <div className="container">
                <div className='editor'>
                  <CKEditor
                    data={this.state.editNote.desc} 
                    onChange={this.handleChange}
                    editor={Editor}
                    config={{
                      extraPlugins: [TrackChangesIntegration],
                      exportPdf: {
                        stylesheets: ['EDITOR_STYLES'],
                        fileName: 'demo.pdf',
                        converterUrl: 'https://pdf-converter.cke-cs.com/v1/convert',
                        dataCallback: editor => editor.getData({
                          showSuggestionHighlights: true
                        }),
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

                      // sidebar: {
                      //   container: this.sidebarElementRef.current
                      // },
                      licenseKey: '8IaxBmSPg7BqjT7H84CPrzQpNcaip4P9ScPSA2mdBv7DrFvF4ml+UXtbYg=='
                    }}
                  />
                </div>
                {/* <div ref={this.sidebarElementRef} className="sidebar"></div> */}
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  /*refreshDisplayMode() {
		if ( !this.state.editor ) {
			return;
		}

		const annotationsUIs = this.state.editor.plugins.get( 'AnnotationsUIs' );
		const sidebarElement = this.sidebarElementRef.current;

		if ( window.innerWidth < 1070 ) {
			sidebarElement.classList.remove( 'narrow' );
			sidebarElement.classList.add( 'hidden' );
			annotationsUIs.switchTo( 'inline' );
		}
		else if ( window.innerWidth < 1300 ) {
			sidebarElement.classList.remove( 'hidden' );
			sidebarElement.classList.add( 'narrow' );
			annotationsUIs.switchTo( 'narrowSidebar' );
		}
		else {
			sidebarElement.classList.remove( 'hidden', 'narrow' );
			annotationsUIs.switchTo( 'wideSidebar' );
		}
	}*/
}


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
            url: `http://localhost:3001/suggestion/${suggestionId}`,    //function for Get Suggestion
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

      addSuggestion: suggestionData => {  //function for add function

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

				return axios({                         //function for Update Suggestion
           method: "PUT",
           url: `http://localhost:3001/suggestion/${id}`,
           data: suggestionData
        }).then( response => console.log(response))
        .catch(error => console.log(error))
			}
    };

    commentsRepositoryPlugin.adapter = {
      getCommentThread: ({ threadId }) => {  //function for get comment

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
      addComment: data => {  //function for add comments

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

      updateComment: data => {    //function for update comments

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
      
      removeComment: data => { //function for remove comments
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

export const EditNotes = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { pathname } = useLocation();
  return (
    <TrackChanges navigate={navigate} params={id} path={pathname} />
  )
}





