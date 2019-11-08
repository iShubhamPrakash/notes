import React, { Component } from 'react';
import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';



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
          noteId: "",
          listId: "",
          tags: [],
          category: "",
        },
        {
          title: "Note 2",
          text: "<p><a href=\"http://localhost:3000/notes\" rel=\"noopener noreferrer\" target=\"_blank\">http://localhost:3000/notes</a></p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam esse, vero temporibus rerum voluptatum aspernatur at minima ipsa sequi exercitationem!</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam esse, vero temporibus rerum voluptatum aspernatur at minima ipsa sequi exercitationem!</p>",
          noteId: "",
          listId: "",
          tags: [],
          category: "",
        },
        {
          title: "Note 3",
          text: "<p><a href=\"http://localhost:3000/notes\" rel=\"noopener noreferrer\" target=\"_blank\">http://localhost:3000/notes</a></p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam esse, vero temporibus rerum voluptatum aspernatur at minima ipsa sequi exercitationem!</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam esse, vero temporibus rerum voluptatum aspernatur at minima ipsa sequi exercitationem!</p>",
          noteId: "",
          listId: "",
          tags: [],
          category: "",
        },
        {
          title: "Note 4",
          text: "<p><a href=\"http://localhost:3000/notes\" rel=\"noopener noreferrer\" target=\"_blank\">http://localhost:3000/notes</a></p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam esse, vero temporibus rerum voluptatum aspernatur at minima ipsa sequi exercitationem!</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam esse, vero temporibus rerum voluptatum aspernatur at minima ipsa sequi exercitationem!</p>",
          noteId: "",
          listId: "",
          tags: [],
          category: "",
        },
        {
          title: "Note 5",
          text: "<p><a href=\"http://localhost:3000/notes\" rel=\"noopener noreferrer\" target=\"_blank\">http://localhost:3000/notes</a></p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam esse, vero temporibus rerum voluptatum aspernatur at minima ipsa sequi exercitationem!</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam esse, vero temporibus rerum voluptatum aspernatur at minima ipsa sequi exercitationem!</p>",
          noteId: "",
          listId: "",
          tags: [],
          category: "",
        },
      ],
      title:"",
      text: "",
      noteId: null,
      listId: null,
      theme: "bubble",
      
      viewClass: ["col col-12 col-md-6 col-lg-4","col col-12 col-md-6","col col-12"],
      viewBtnClass: ["fas fa-th","fas fa-th-large","fas fa-bars"],
      viewIndex:0,
    }
  }

  componentDidMount() {
    //Replcae link in placeholder to listiee.com
    document.querySelector('.ql-tooltip-editor input').setAttribute("data-link", "https://listiee.com");
  }

  handleEdit = (e, i) => {
    let editor = document.querySelector("#editor" + i);
    editor.setAttribute("readOnly", false);
    console.log(editor);

    // editor.readOnly(false);

  }

  renderNotes = () => {
    let { notes } = this.state;
    

    return notes.map((note,i) => {
      return (
        <div className={this.state.viewClass[this.state.viewIndex]}>
          <div className="note">
            <div className="note-title note-title-bottom">{note.title}</div>
            <ReactQuill
              value={note.text}
              readOnly={true}
              theme={"bubble"}
              className="note-text note-text-bottom"
              id={"editor" + i}
              key={i}
            />
            <div className="note-tool-container">
              <span className="note-tool btn" title="edit" onClick={e=>this.handleEdit(e,i)}><i className="fas fa-pen"/></span>
              <span className="note-tool btn" title="delete"><i className="far fa-trash-alt" /></span>
              <span className="note-tool btn" title="setting"><i className="fas fa-cog"/></span>
            </div>
          </div>
        </div>
      )
    })
  }

  handleTitleChange = (e) => {
    this.setState({ title: e.target.value });
  }

  handleChange = (text) => {
    this.setState({ text });
  }
  
  saveNote = (e) => {
    let {tags, category } = this.state;
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

    let newNote = {
      title, text, tags, category
    };

    this.setState({
      notes: [newNote,...this.state.notes],
      title: "",
      text: "",
      tags: [],
      category:"",
    })

  }

  handleKeyPress = e => {
    if (e.target.name === "title") {
      this.handleFocousNext(e);
    }
  }

  handleFocousNext = (e) => {
    if (e.key === "Enter") {
      // console.log(e.key);
      this.refs.quill.focus();
    }
  }

  clearEditorContent = e => {
    this.setState({
      title: "",
      text: "",
      tags: [],
      category:"",
    })
  }

  handleViewChange = () => {
    let index=this.state.viewIndex;
    if (index === 2)
      index = 0
    else
      index++;
    this.setState({ viewIndex: index})
  }

  render() {
    return (
      <div className="container">
        <div className="notes-component-container">
          <div className="row">
            <div className="col col-12">
              <div className="search-container">
                <div className="notes-search-icon">
                  <i className="fas fa-search"/>
                </div>
                <input
                  type="text"
                  className="notes-search"
                  placeholder="Search"
                  name="search"
                  onKeyPress={this.handleKeyPress}
                />
                <div className="notes-search-clear-icon">
                  <i className="fas fa-times"/>
                </div>
              </div>
            </div>
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
                    <button className="tool btn" onClick={this.clearEditorContent}><i className="far fa-trash-alt" />{" "}Clear</button>
                    <button className="tool btn"><i className="fas fa-cog"/>{" "}Setting</button>
                  </div>
                </div>
                
                <div className="saved-note-header">
                  <small>SAVED</small>
                  <div className="stretch"></div>
                  <div className="view-btn"><small>View:</small><button type="button" title="Click to change view" onClick={this.handleViewChange}><i className={this.state.viewBtnClass[this.state.viewIndex]}/></button>
                </div>  
                </div>
                <div className="row">
                  {this.renderNotes()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Notes;