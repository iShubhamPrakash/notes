const {Client} = require('pg')

const client = new Client({
    user: "shubham",
    password: "psql@2308",
    host: "localhost",
    port: 5432,
    database: "notes"
})

// test();


async function test(){
    try{
        await client.connect()
        const res = await client.query('SELECT * FROM notes')
        console.table(res.rows)
        
    }catch(e){
        console.log(`Something wrong happend ${e}`)
    }
    finally{
        await client.end()
        console.log("Client disconnected successfully.")  
    }
}