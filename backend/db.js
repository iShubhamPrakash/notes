const { Pool } = require('pg')

const pool = new Pool({
    user: "shubham",
    password: "psql@2308",
    host: "localhost",
    port: 5432,
    database: "notes"
})


/// For testing

// test();

// for(i=1; i< 1000; i++){
//     test(i);
// }


async function test(i){
    const client= await pool.connect()
    try{
        const res = await client.query('SELECT * FROM notes')
        console.table(res.rows)
        
    }catch(e){
        console.log(`Something wrong happend ${e}`)
    }
    finally{
        // await client.end()
        client.release()
        console.log("Client disconnected successfully.", i)  
    }
}

async function getNotesFromDB(){
    const client= await pool.connect()
    let result = null
    try{
        
        const res = await client.query('SELECT * FROM notes ORDER BY "noteId" DESC')
        result = res.rows
    }catch(e){
        console.log(`Something wrong happend ${e}`)
    }
    finally{
        await client.release()
        // console.log("Client disconnected successfully.")
        return result  
    } 
}

async function getNoteByIdFromDB(noteId){
    const client= await pool.connect()
    let result = null
    try{
        
        const res = await client.query('SELECT * FROM notes WHERE "noteId"= $1',[noteId])
        result = res.rows
    }catch(e){
        console.log(`Something wrong happend ${e}`)
    }
    finally{
        await client.release()
        // console.log("Client disconnected successfully.")
        return result  
    } 
}


async function deleteNoteFromDB(noteId){
    const client= await pool.connect()
    try{
        console.log("Deleting note with id=",noteId);
        
        const res = await client.query('DELETE FROM notes where "noteId" = $1',[noteId])
        return "success"
    
    }catch(e){
        console.log(`Something wrong happend ${e}`)
        return null
    }
    finally{
        await client.release()
        console.log("Client disconnected successfully.")  
    } 
}

async function togglePinInDB(noteId){
    const client= await pool.connect()
    try{
        console.log("Toggleing note with id=",noteId);
        const res = await client.query('UPDATE notes SET pinned = NOT pinned where "noteId"= $1',[noteId])
        return "success"
    
    }catch(e){
        console.log(`Something wrong happend ${e}`)
        return null
    }
    finally{
        await client.release()
        console.log("Client disconnected successfully.")  
    } 
}

async function editNoteInDB(noteId,title,text,pinned){
    const client= await pool.connect()
    try{
        console.log("Toggleing note with id=",noteId);
        const res = await client.query('UPDATE notes SET title=$1, text=$2, pinned=$3 where "noteId"= $4',[title, text, pinned, noteId])
        return "success"
    
    }catch(e){
        console.log(`Something wrong happend ${e}`)
        return null
    }
    finally{
        await client.release()
        console.log("Client disconnected successfully.")  
    } 
}

async function createNoteInDB(title,text,pinned){
    const client= await pool.connect()
    try{
        const res = await client.query('INSERT into notes (title, text, pinned) values ($1,$2,$3)',[title, text, pinned])
        return "success"
    }catch(e){
        console.log(`Something wrong happend ${e}`)
        return null
    }
    finally{
        await client.release()
        console.log("Client disconnected successfully.")  
    } 
}

module.exports={
    pool,
    getNotesFromDB,
    togglePinInDB,
    deleteNoteFromDB,
    editNoteInDB,
    createNoteInDB,
    getNoteByIdFromDB,
}