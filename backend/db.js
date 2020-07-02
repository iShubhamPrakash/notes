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

async function getNotesFromDB(user_id){
    const client= await pool.connect()
    let result = null
    try{
        
        const res = await client.query('SELECT * FROM notes where user_id=$1 ORDER BY "noteId" DESC',[user_id])
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

async function getNoteByIdFromDB(noteId, user_id){
    const client= await pool.connect()
    let result = null
    try{
        
        const res = await client.query('SELECT * FROM notes WHERE user_id=$1 AND "noteId"= $2',[user_id,noteId])
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


async function deleteNoteFromDB(noteId, user_id){
    const client= await pool.connect()
    try{
        console.log("Deleting note with id=",noteId);
        const res = await client.query('DELETE FROM notes where user_id=$1 AND "noteId" = $2',[user_id, noteId])
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

async function togglePinInDB(noteId,user_id){
    const client= await pool.connect()
    try{
        console.log("Toggleing note with id=",noteId);
        const res = await client.query('UPDATE notes SET pinned = NOT pinned where user_id=$1 AND "noteId"= $2',[user_id, noteId])
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

async function editNoteInDB(noteId,title,text,pinned, user_id){
    const client= await pool.connect()
    try{
        console.log("Toggleing note with id=",noteId);
        const res = await client.query('UPDATE notes SET title=$1, text=$2, pinned=$3 where user_id=$4 AND "noteId"= $5',[title, text, pinned, user_id, noteId])
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

async function createNoteInDB(title,text,pinned, user_id){
    const client= await pool.connect()
    try{
        // "RETURNING *" at the end of query allow us to get back the newly created entry in db 
        const res = await client.query('INSERT into notes (title, text, pinned, user_id) values ($1, $2, $3, $4) RETURNING *',[title, text, pinned, user_id])
        return {sucess:true, note:res.rows[0]}
    }catch(e){
        console.log(`Something wrong happend ${e}`)
        return {sucess:false}
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