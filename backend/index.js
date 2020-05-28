const express = require('express')
const cors = require('cors')
const bodyParser= require('body-parser')


const app = express()


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.listen(5000,e=>console.log("Running server on http://localhost:5000..."))

let notes= [
    {
      title: "Note 1",
      text: '<h1>note 1</p>',
      noteId: "decfb430-01d4-11ea-9dd9-195e9663b7e2",
      pinned:false,
    },
    {
      title: "Note 2",
      text: "<p>note 2</p>",
      noteId: "f06a3c10-01d4-11ea-9dd9-195e9663b7e2",
      pinned:false,
    },
    {
      title: "Note 3",
      text: "<p>note 3</p>",
      noteId: "0f3980b0-01d5-11ea-9dd9-195e9663b7e2",
      pinned:true,
    },
    {
      title: "Note 4",
      text: "<p>note 4</p>",
      noteId: "fbd49910-01d4-11ea-9dd9-195e9663b7d2",
      pinned:false,
    },
  
  ]

app.get('/',(req,res)=> res.send("Hello world..."))


// Get all notes
app.get('/notes',(req,res)=>{
    res.status(200).send({
        success: true,
        total_notes: notes.length,
        notes: notes
    })
})


// Get note by id
app.get('/notes/:noteId',(req,res)=>{
    const noteId= req.params.noteId
    
    const note= notes.filter(note=>note.noteId===noteId)[0]

    res.status(200).send({
        success: true,
        note:note
    })
})

// Edit note by id
app.put('/notes/:noteId',(req,res)=>{
    const noteId= req.params.noteId
    const {title,text,pinned} = req.body
    
    notes= notes.map(note=>{
        if(note.noteId === noteId){
            return {
                title,
                text,
                noteId,
                pinned,
            }
        }
        return note
    })
    console.log("Updated", noteId);
    
    res.status(200).send({
        success: true,
        message: "Note updated successfully"
    })
})




// Delete note by id
app.delete('/notes/:noteId',(req,res)=>{
    const noteId= req.params.noteId
    notes= notes.filter(note=>note.noteId !== noteId)
    console.log("Delete", noteId);
    
    res.status(200).send({
        success: true,
        message: "Note deleted successfully"
    })
})

// Add a new note
app.post('/notes/add',(req,res)=>{
    const {title,text,pinned,noteId} = req.body
    notes.push({title,text,pinned,noteId})
    console.log("Added new note", noteId);
    
    res.status(200).send({
        success: true,
        message: "Note added successfully"
    })
})

// toggle pin in a note-
app.put('/notes/togglePin/:noteId',(req,res)=>{
  const noteId= req.params.noteId
  notes= notes.map(note=>{
      if(note.noteId === noteId){
          return {
              title: note.title,
              text: note.text,
              noteId: note.noteId,
              pinned: !note.pinned,
          }
      }
      return note
  })
  console.log("Updated pinned status", noteId);
  
  res.status(200).send({
      success: true,
      message: "Updated pinned status successfully"
  })
})