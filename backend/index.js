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