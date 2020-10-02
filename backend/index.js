const express = require('express')
const cors = require('cors')
const bodyParser= require('body-parser')
require('dotenv').config()
const {
    pool,
    getNotesFromDB,
    deleteNoteFromDB,
    togglePinInDB,
    editNoteInDB,
    createNoteInDB,
    getNoteByIdFromDB
} = require('./db')

const app = express()


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

app.listen(PORT,e=>console.log(`Running server on http://localhost:${PORT}`))

app.get('/',(req,res)=> res.send("Hello world..."))

// Get all notes
app.get('/notes',async (req,res)=>{
    const user_id= req.body.user_id;

    try{
        const notes= await getNotesFromDB(parseInt(user_id))

        if(notes=== null){
            throw "could not get notes from the database"
        }

        res.status(200).send({
            success: true,
            total_notes: notes.length,
            notes: notes
        })

    }catch(e){
        console.log(`Something wrong happend ${e}`)
        
        res.status(500).send({
            success: false,
            message: e
        })
    }
})


// Get note by id
app.get('/notes/:noteId',async (req,res)=>{
    const noteId= req.params.noteId
    const user_id= req.body.user_id;

    parseInt(user_id)
    try{
        const notes= await getNoteByIdFromDB(parseInt(noteId),parseInt(user_id))

        if(notes=== null){
            throw "could not get note from the database"
        }

        res.status(200).send({
            success: true,
            total_notes: notes.length,
            notes: notes
        })

    }catch(e){
        console.log(`Something wrong happend ${e}`)
        
        res.status(500).send({
            success: false,
            message: e
        })
    }
})

// Edit note by id
app.put('/notes/:noteId',(req,res)=>{
    const noteId= req.params.noteId
    const {title,text,pinned} = req.body
    const user_id= req.body.user_id;

    
    try{
        const update = editNoteInDB(parseInt(noteId),title,text, pinned,parseInt(user_id))

        if(update === null){
            throw "Could not toggle pin"
        }

        res.status(200).send({
            success: true,
            message: "Note updated successfully"
        })

    }catch(e){
        res.status(500).send({
            success: false,
            message: e
        })
    }

})




// Delete note by id
app.delete('/notes/:noteId',async (req,res)=>{
    const noteId= req.params.noteId
    const user_id= req.body.user_id;

    try{
        const del = await deleteNoteFromDB(noteId, parseInt(user_id))

        if(del === null){
            throw "Could not delete the note."
        }

        res.status(200).send({
            success: true,
            message: "Note deleted successfully"
        })
    }
    catch(e){
        res.status(500).send({
            success: false,
            message: e
        })
    }
})

// Add a new note
app.post('/notes/add', async (req,res)=>{
    const {title,text,pinned} = req.body
    const user_id= req.body.user_id;

    try{
        const create = await createNoteInDB(title,text,pinned, parseInt(user_id))

        if(create.success === false){
            throw "Could not add note"
        }

        res.status(200).send({
            note: create.note,
            success: true,
            message: "Note created successfully",
        })

    }catch(e){
        res.status(500).send({
            success: false,
            message: e
        })
    }

})

// toggle pin in a note-
app.put('/notes/togglePin/:noteId',(req,res)=>{
    const noteId= req.params.noteId   
    const user_id= req.body.user_id;

    try{
        const update = togglePinInDB(parseInt(noteId), parseInt(user_id))

        if(update === null){
            throw "Could not toggle pin"
        }

        res.status(200).send({
            success: true,
            message: "Updated pinned status successfully"
        })
    }catch(e){
        res.status(500).send({
            success: false,
            message: e
        })
    }
})