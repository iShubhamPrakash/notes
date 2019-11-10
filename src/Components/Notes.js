import React, { Component } from 'react';
import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import'./Notes.sass'
import uuid from 'uuid/v1'
import Editor from './Editor';

/*
Structure of a Note object:
{
  title: "Note 1", 
  text: "",         
  noteId: "",       
  listId: "",  //list id of the list with which this note is associated
  tags: [],
  category:""
  theme:"bubble",         //Two options- "bubble" or "snow"
}
*/
class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [
        {
          title: "Note 1",
          text: '<h1>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam esse, vero temporibus rerum voluptatum aspernatur at minima ipsa sequi exercitationem!</h1><p><br></p><h2>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam esse, vero temporibus rerum voluptatum aspernatur at minima ipsa sequi exercitationem!</h2><p><br></p><blockquote>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam esse, vero temporibus rerum voluptatum aspernatur at minima ipsa sequi exercitationem!</blockquote><p><br></p><p><strong>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam esse, vero temporibus rerum voluptatum aspernatur at minima ipsa sequi exercitationem!</strong></p><p><br></p><p><em>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam esse, vero temporibus rerum voluptatum aspernatur at minima ipsa sequi exercitationem!</em></p><p><br></p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam esse, vero temporibus rerum voluptatum aspernatur at minima ipsa sequi exercitationem!</p><p><br></p><p><a href="http://localhost:3000/www.google.com" rel="noopener noreferrer" target="_blank">www.google.com</a></p><p><br></p><p>shubham prakash</p>',
          noteId: "decfb430-01d4-11ea-9dd9-195e9663b7e2",
          pinned:false,
        },
        {
          title: "Note 2",
          text: "<p><a href=\"http://localhost:3000/notes\" rel=\"noopener noreferrer\" target=\"_blank\">http://localhost:3000/notes</a></p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam esse, vero temporibus rerum voluptatum aspernatur at minima ipsa sequi exercitationem!</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam esse, vero temporibus rerum voluptatum aspernatur at minima ipsa sequi exercitationem!</p>",
          noteId: "f06a3c10-01d4-11ea-9dd9-195e9663b7e2",
          pinned:false,
        },
        {
          title: "Note 5",
          text: "<p><a href=\"http://localhost:3000/notes\" rel=\"noopener noreferrer\" target=\"_blank\">http://localhost:3000/notes</a></p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam esse, vero temporibus rerum voluptatum aspernatur at minima ipsa sequi exercitationem!</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam esse, vero temporibus rerum voluptatum aspernatur at minima ipsa sequi exercitationem!</p>",
          noteId: "0f3980b0-01d5-11ea-9dd9-195e9663b7e2",
          pinned:true,
        },
        {
          title: "Note 3",
          text: "<p><a href=\"http://localhost:3000/notes\" rel=\"noopener noreferrer\" target=\"_blank\">http://localhost:3000/notes</a></p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam esse, vero temporibus rerum voluptatum aspernatur at minima ipsa sequi exercitationem!</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam esse, vero temporibus rerum voluptatum aspernatur at minima ipsa sequi exercitationem!</p>",
          noteId: "fbd49910-01d4-11ea-9dd9-195e9663b7d2",
          pinned:false,
        },
        {
          title: "Note 3",
          text: "<p><a href=\"http://localhost:3000/notes\" rel=\"noopener noreferrer\" target=\"_blank\">http://localhost:3000/notes</a></p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam esse, vero temporibus rerum voluptatum aspernatur at minima ipsa sequi exercitationem!</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam esse, vero temporibus rerum voluptatum aspernatur at minima ipsa sequi exercitationem!</p>",
          noteId: "fbd49910-01d4-11ea-9dd9-195e9663b7e2",
          pinned:true,
        },
        {
          title: "Note 4",
          text: "<p><a href=\"http://localhost:3000/notes\" rel=\"noopener noreferrer\" target=\"_blank\">http://localhost:3000/notes</a></p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam esse, vero temporibus rerum voluptatum aspernatur at minima ipsa sequi exercitationem!</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam esse, vero temporibus rerum voluptatum aspernatur at minima ipsa sequi exercitationem!</p>",
          noteId: "065dbdd0-01d5-11ea-9dd9-195e9663b7e2",
          pinned:false,
        },
        {
          title: "Note 5",
          text: "<p><a href=\"http://localhost:3000/notes\" rel=\"noopener noreferrer\" target=\"_blank\">http://localhost:3000/notes</a></p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam esse, vero temporibus rerum voluptatum aspernatur at minima ipsa sequi exercitationem!</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam esse, vero temporibus rerum voluptatum aspernatur at minima ipsa sequi exercitationem!</p>",
          noteId: "0f3980b0-01d5-11ea-9dd9-195e9663d7e2",
          pinned:false,
        },
        {
          title: "Note 4",
          text: "<p><a href=\"http://localhost:3000/notes\" rel=\"noopener noreferrer\" target=\"_blank\">http://localhost:3000/notes</a></p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam esse, vero temporibus rerum voluptatum aspernatur at minima ipsa sequi exercitationem!</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam esse, vero temporibus rerum voluptatum aspernatur at minima ipsa sequi exercitationem!</p>",
          noteId: "065dbdd0-01d5-11ea-9dd9-195e9663bse2",
          pinned:true,
        },
      ],
      title:"",
      text: "",

      theme: "bubble",
      viewClass: ["custom-row custom-row-3","custom-row custom-row-2","custom-row custom-row-1"],
      viewBtnClass: ["fas fa-th","fas fa-th-large","fas fa-bars"],
      viewIndex:0,
      viewIndexPinned: 0,
      pinnedCount: 0,
      savedCount: 0,
      isSearching: false,
      modalShow: false,
      editNoteId: null,
      editNoteObject:null,
      searchTerm:"",
    }

  }

  componentDidMount() {
    //Replace link in placeholder to example.com
    if(document.querySelector('.ql-tooltip-editor input'))
      document.querySelector('.ql-tooltip-editor input').setAttribute("data-link", "https://example.com");
    
    this.calculateNoteCount();

    if(window.innerWidth < 550){
      this.setState({
        viewClass: ["custom-row custom-row-1","custom-row custom-row-2","custom-row custom-row-3"],
        viewBtnClass: ["fas fa-bars","fas fa-th-large","fas fa-th"],
      })
    }

  }

  calculateNoteCount = () => {
    let { notes } = this.state;
    let savedCount = notes.length;
    let pinnedCount = 0;

    notes.map(note => {
      if (note.pinned === true)
        pinnedCount++;  
    })
    savedCount = savedCount - pinnedCount;
    this.setState({ pinnedCount, savedCount });
  }

  handleEdit = async (noteId) => {
    await this.setState(prevState => {
      let { notes } = prevState;
      let editNoteObject;
      for (const note of notes) {
        if (note.noteId === noteId) {
          editNoteObject = note;
        }
      }
      return {editNoteId:noteId,editNoteObject}
    })
    this.setModalShow();
  }

  handleDelete = async (noteId) => {
    if (window.confirm("Delete this note?")) {
      await this.deleteNote(noteId);
      this.calculateNoteCount();
    }
  }

  deleteNote = async (noteId) => {
    this.setState(prevState => {
      let { notes } = prevState;
      notes = notes.filter(note => note.noteId !== noteId);
      return ({ notes });
    });
  }

  handlePin=async (noteId) => {
    await this.setState(prevState => {
      let { notes } = prevState;
      let modifiedNote;
      let newNotes = notes.filter(note => {
        if (note.noteId !== noteId) {
          return true;
        } else {
          modifiedNote = note;
          modifiedNote.pinned = true;
          return false;
        }
      });
      return ({ notes: [modifiedNote, ...newNotes] });
    });

  this.calculateNoteCount();
    if(document.querySelector(".pinnedNotes"))
      document.querySelector(".pinnedNotes").scrollIntoView({ behavior: 'smooth' });
  }

  handleUnpin=async (noteId) => {
    await this.setState(prevState => {
      let { notes } = prevState;
      let modifiedNote;
      let newNotes = notes.filter(note => {
        if (note.noteId !== noteId) {
          return true;
        } else {
          modifiedNote = note;
          modifiedNote.pinned = false;
          return false;
        }
      });
      return ({ notes: [modifiedNote, ...newNotes] });
    });

    this.calculateNoteCount();
  }

  createNoteElement = (note, i) => {
    return (
      <div  key={note.noteId} className="row-item">
        <div className="note">
          <div className="note-title note-title-bottom">{note.title}</div>
          <ReactQuill
            value={note.text}
            readOnly={true}
            theme={"bubble"}
            className="note-text note-text-bottom"
            id={note.noteId}
          />
          <div className="note-tool-container">
            <span className="note-tool btn" title="edit" onClick={e=>this.handleEdit(note.noteId)}><i className="fas fa-pen"/></span>
            <span className="note-tool btn" title="delete" onClick={e=>this.handleDelete(note.noteId)}><i className="far fa-trash-alt"/></span>
            {
              note.pinned ?
              <span className="note-tool btn" title="unpin note" onClick={e=>this.handleUnpin(note.noteId)}><i className="fas fa-thumbtack" style={{color:"pink"}}/></span>    
              :<span className="note-tool btn" title="pin note" onClick={e => this.handlePin(note.noteId)}><i className="fas fa-thumbtack" /></span>
            }
          </div>
        </div>
      </div>
    );
  }

  renderSavedNotes = () => {
    let { notes } = this.state;
    return notes.map((note, i) => {
      if (note.pinned === false) {
        return this.createNoteElement(note,i);
      }
    })
  }

  renderPinnedNotes = () => {
    let { notes } = this.state;
    return notes.map((note, i) => {
      if (note.pinned === true)
        return this.createNoteElement(note,i);
    })
  }

  handleSearchKeyPress = e => {
    this.setState({searchTerm:e.target.value.toLowerCase()})
  }
  
  renderSearchedNotes = () => {
    const { notes } = this.state;
    const filteredNotes = notes.filter(note => {
      const { searchTerm } = this.state;
      return (note.text.toLowerCase() + note.title.toLowerCase()).includes(searchTerm)
    })
    
    return filteredNotes.map((note, i) => {
      // this.createNoteElement(note,i);
      return (
        <div  key={note.noteId} className="row-item">
          <div className="note">
            <div className="note-title note-title-bottom">{note.title}</div>
            <ReactQuill
              value={note.text}
              readOnly={true}
              theme={"bubble"}
              className="note-text note-text-bottom"
              id={note.noteId}
            />
            <div className="note-tool-container">
              <span className="note-tool btn" title="edit" onClick={e=>this.handleEdit(note.noteId)}><i className="fas fa-pen"/></span>
              <span className="note-tool btn" title="delete" onClick={e=>this.handleDelete(note.noteId)}><i className="far fa-trash-alt"/></span>
              {
                note.pinned ?
                <span className="note-tool btn" title="unpin note" onClick={e=>this.handleUnpin(note.noteId)}><i className="fas fa-thumbtack" style={{color:"pink"}}/></span>    
                :<span className="note-tool btn" title="pin note" onClick={e => this.handlePin(note.noteId)}><i className="fas fa-thumbtack" /></span>
              }
            </div>
          </div>
        </div>
      );
    })
  }

  handleTitleChange = (e) => {
    this.setState({ title: e.target.value });
  }

  handleChange = (text) => {
    this.setState({ text });
  }
  
  saveNote = async (e) => {
    let title = this.state.title.trim();
    let text = this.state.text.trim();

    if (title.length===0) {
      alert("Please add title");
      return;
    }
    if (text.length===0) {
      alert("Please add content");
      return;
    }

    const noteId = uuid();

    let newNote = {
      title, text, noteId, pinned:false,
    };

    await this.setState({
      notes: [newNote, ...this.state.notes],
      title: "",
      text: "",
    });

    this.calculateNoteCount();
    if(document.querySelector(".saveNotes"))
      document.querySelector(".saveNotes").scrollIntoView({ behavior: 'smooth' });
  }

  handleKeyPress = e => {
    if (e.target.name === "title") {
      this.handleFocousNext(e);
    }
  }

  handleFocousNext = (e) => {
    if (e.key === "Enter") {
      this.refs.quill.focus();
    }
  }

  clearEditorContent = e => {
    if (window.confirm("Delete this note?")) { 
      this.setState({
        title: "",
        text: "",
        tags: [],
        category:"",
      })
    }
  }

  handleViewChange = () => {
    let index=this.state.viewIndex;
    if (index === 2)
      index = 0
    else
      index++;
    this.setState({ viewIndex: index})
  }

  handleViewChangePinned = () => {
    let index=this.state.viewIndexPinned;
    if (index === 2)
      index = 0
    else
      index++;
    this.setState({ viewIndexPinned: index})
  }

  handleStartSearch = () => {
    this.setState({ isSearching: true });  
  }

  handleClearSearch = () => {
    this.setState({ isSearching: false });  
  }

  setModalShow = async () => {
    this.setState({ modalShow: true });
  }

  setModalHide = async () => {
    if (window.confirm("Close without saving?")) {
      await this.setState(prevState => {
        return { editNoteId: null, editNoteObject:null }
      });
      this.setState({ modalShow: false });
    }
  }

  saveEdit = async (editNoteId,title,text) => {
    title = title.trim();
    text = text.trim();

    if (title.length===0) {
      alert("Please add title");
      return;
    }
    if (text.length===0) {
      alert("Please add content");
      return;
    }

    await this.setState(prevState => {
      let { notes } = prevState;
      let newNote;
      let index = 0;
      for (const note of notes) {
        if (note.noteId === editNoteId) {
          newNote = note;
          break;
        }
        index++;
      }
      newNote.title = title;
      newNote.text = text;
      notes[index] = newNote;
      return { notes}
    });

    this.setState({
      modalShow: false,
      editNoteId: null,
      editNoteObject:null,
    })
  }

  render() {
    const {
      isSearching,
      searchTerm,
      modalShow,
      editNoteId,
      notes,
      editNoteObject
    } = this.state;
    return (
      <div className="container">
        <div className="notes-component-container">
          <Editor
            show={modalShow}
            onHide={this.setModalHide}
            editNoteId={editNoteId}
            editableNote={editNoteObject}
            saveEdit={this.saveEdit}
          />
          <div className="row">
            <div className="col col-12">
                <div className="search-container">
                  <div className="notes-search-icon" onClick={this.handleStartSearch}>
                    <i className="fas fa-search"/>
                  </div>
                  <input
                    type="text"
                    className="notes-search"
                    placeholder="Search"
                    name="search"
                    value={searchTerm}
                    onChange={this.handleSearchKeyPress}
                  />
                  <div className="notes-search-clear-icon" onClick={this.handleClearSearch}>
                    <i className="fas fa-times"/>
                  </div>
                </div>
              </div>
          {isSearching ?
              <div className="row">
                <div className="col col-12">
                    <div className="saved-note-header pinnedNotes">
                      <p className="search-reasult-header"><i className="fas fa-search"></i>  Search results:</p>
                      <div className="stretch"></div>
                      <div className="view-btn"><small>View:</small><button type="button" title="Click to change view" onClick={this.handleViewChangePinned}><i className={this.state.viewBtnClass[this.state.viewIndexPinned]}/></button>
                    </div>  
                    </div>
                  <div className={this.state.viewClass[this.state.viewIndexPinned]}>
                    {this.renderSearchedNotes()}
                  </div>
                </div>
              </div>
               :
            <div className="col col-12">
              <div className="notes-container">
                <div className="active-note-container">
                  <input
                    className="note-title"
                    name="title"
                    type="text"
                    value={this.state.title}
                    placeholder="New note"
                    onChange={this.handleTitleChange}
                    onKeyPress={this.handleKeyPress}
                    autoFocus={true}
                    autoComplete="off"
                  />
                  <ReactQuill
                    value={this.state.text}
                    onChange={this.handleChange} 
                    theme={this.state.theme}
                    className="note-text note-text-top"
                    ref="quill"
                  />
                  <div className="tool-container">
                    <button className="tool btn" onClick={this.saveNote}><i className="far fa-check-circle"/>{" "}Save</button>
                    <button className="tool btn" onClick={this.clearEditorContent}><i className="fas fa-times" />{" "}Cancel</button>
                    {/* <button className="tool btn"><i className="fas fa-cog"/>{" "}Setting</button> */}
                  </div>
                </div>
                
                {this.state.pinnedCount> 0 ?
                  <div>
                    <div className="saved-note-header pinnedNotes">
                      <small>PINNED: <span className="note-count">{this.state.pinnedCount}</span></small>
                      <div className="stretch"></div>
                      <div className="view-btn"><small>View:</small><button type="button" title="Click to change view" onClick={this.handleViewChangePinned}><i className={this.state.viewBtnClass[this.state.viewIndexPinned]}/></button>
                    </div>  
                    </div>
                  </div>
                  : null}
                
                  <div className={this.state.viewClass[this.state.viewIndexPinned]}>
                    {this.renderPinnedNotes()}
                  </div>

                <div className="saved-note-header saveNotes">
                  <small>SAVED: <span className="note-count">{this.state.savedCount}</span></small>
                  <div className="stretch"></div>
                    <div className="view-btn">
                      <small>View:</small>
                      <button type="button" title="Click to change view" onClick={this.handleViewChange}>
                        <i className={this.state.viewBtnClass[this.state.viewIndex]} />
                      </button>
                    </div>  
                  </div>
                <div className={this.state.viewClass[this.state.viewIndex]}>
                  {this.renderSavedNotes()}
                </div>
              </div>
            </div>
            }
            </div>
        </div>
      </div>
    )
  }
}

export default Notes;