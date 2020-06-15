import React, { Component } from 'react';
import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import'./Notes.sass'
import uuid from 'uuid/v1'
import Editor from './Editor';

import { baseURL } from '../constants/baseConstants'

import { connect } from 'react-redux'
import { 
  loadNotes,
  deleteNote,
  togglePinStatus,
  createNote
} from '../store/actions'
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
      // notes: [],
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

  async componentDidMount() {
    //Replace link in placeholder to example.com
    if(document.querySelector('.ql-tooltip-editor input'))
      document.querySelector('.ql-tooltip-editor input').setAttribute("data-link", "https://example.com");
    
    if(window.innerWidth < 550){
      this.setState({
        viewClass: ["custom-row custom-row-1","custom-row custom-row-2","custom-row custom-row-3"],
        viewBtnClass: ["fas fa-bars","fas fa-th-large","fas fa-th"],
      })
    }

    await this.props.loadNotes()
    this.calculateNoteCount();

  }

  calculateNoteCount = () => {
    let { notes } = this.props;
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

    await this.setState(( prevState,props )=> {
      let { notes } = props;
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
      await this.props.deleteNote(noteId)
      this.calculateNoteCount();
    }
  }

  togglePinStatus= async (noteId)=>{
    let res = await this.props.togglePinStatus(noteId)
    if(res.success=== true && document.querySelector(".pinnedNotes")){
      document.querySelector(".pinnedNotes").scrollIntoView({ behavior: 'smooth' });
    }else{
      alert(" Could not change the pinned status.. Please try again !!")
    }
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
              <span className="note-tool btn" title="unpin note" onClick={e=>this.togglePinStatus(note.noteId)}><i className="fas fa-thumbtack" style={{color:"pink"}}/></span>    
              :<span className="note-tool btn" title="pin note" onClick={e => this.togglePinStatus(note.noteId)}><i className="fas fa-thumbtack" /></span>
            }
          </div>
        </div>
      </div>
    );
  }

  renderSavedNotes = () => {
    let { notes } = this.props;
    return notes.map((note, i) => {
      if (note.pinned === false) {
        return this.createNoteElement(note,i);
      }
    })
  }

  renderPinnedNotes = () => {
    let { notes } = this.props;
    return notes.map((note, i) => {
      if (note.pinned === true)
        return this.createNoteElement(note,i);
    })
  }

  handleSearchKeyPress = e => {
    const { isSearching } = this.state;
    if ( isSearching === false) {
      this.setState(prevState => ({ isSearching: true }));
    }
    this.setState({searchTerm:e.target.value.toLowerCase()})
  }
  
  renderSearchedNotes = () => {
    const { notes } = this.props;
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
                <span className="note-tool btn" title="unpin note" onClick={e=>this.togglePinStatus(note.noteId)}><i className="fas fa-thumbtack" style={{color:"pink"}}/></span>    
                :<span className="note-tool btn" title="pin note" onClick={e => this.togglePinStatus(note.noteId)}><i className="fas fa-thumbtack" /></span>
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

    // const noteId = uuid();

    let newNote = {
      title, text, pinned:false,
    };

    let res = await this.props.createNote(newNote)

    if (res.success === true){
      await this.setState({
        title: "",
        text: "",
      });
      this.calculateNoteCount();
      if(document.querySelector(".saveNotes"))
        document.querySelector(".saveNotes").scrollIntoView({ behavior: 'smooth' });

    }else{
      alert("Could not save the note.. please try again!!")
    }
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
    this.setState({ isSearching: false, searchTerm:"" });  
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

  saveEdit = async (editNoteId,title,text,pinned) => {
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

    let res= await fetch(`${baseURL}/notes/${editNoteId}`,{
      method: 'PUT',
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify({
        title,
        text,
        pinned
      })
    })

    res= await res.json()

    console.log("edit res-",res)

    if(res.success=== true){
      await this.props.loadNotes()
      this.setState({
        modalShow: false,
        editNoteId: null,
        editNoteObject:null,
      })
    }else{
      alert("Could not edit the note...")
    }
  }

  render() {
    const {
      isSearching,
      searchTerm,
      modalShow,
      editNoteId,
      editNoteObject
    } = this.state;

    const {
      notes,
    } = this.props

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
            <div className="col col-12">
              <div className="searched-note-header">
                <p className="item go-back" onClick={this.handleClearSearch}><i className="fas fa-chevron-circle-left"></i> Go back </p>
                <div className="item stretch"><p className="search-reasult-header"><i className="fas fa-search"></i> Search results</p></div>
                <div className="view-btn item">
                  <span className="view">View:</span>
                  <button
                    type="button"
                    title="Click to change view"
                    onClick={this.handleViewChangePinned}
                  >
                    <i className={this.state.viewBtnClass[this.state.viewIndexPinned]} />
                  </button>
                </div>  
                </div>
                <div className={this.state.viewClass[this.state.viewIndexPinned]}>
                  {this.renderSearchedNotes()}
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
                
                  <div>
                    <div className="saved-note-header pinnedNotes">
                      <small>PINNED: <span className="note-count">{this.state.pinnedCount}</span></small>
                      <div className="stretch"></div>
                      <div className="view-btn"><small>View:</small><button type="button" title="Click to change view" onClick={this.handleViewChangePinned}><i className={this.state.viewBtnClass[this.state.viewIndexPinned]}/></button>
                    </div>  
                    </div>
                  </div>
                
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

const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = {
  loadNotes,
  deleteNote,
  togglePinStatus,
  createNote,
}
export default connect(mapStateToProps,mapDispatchToProps)(Notes);