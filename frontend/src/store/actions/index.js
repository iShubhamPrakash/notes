import { baseURL } from '../../constants/baseConstants'

// Action Types
export const LOAD_NOTES = 'LOAD_NOTES'
export const DELETE_NOTE = 'DELETE_NOTE'



// CREATE_NOTE
// EDIT_NOTES
// 
// TOGGLE_PIN

// Action creators
export const loadNotes = () => async (dispatch) => {
    console.log("Fetching notes...")
    let data = await fetch(`${baseURL}/notes`)
    data = await data.json()
    const {notes}= data
    console.log("notes=",notes)
    return dispatch({
        type: LOAD_NOTES,
        notes: notes
    })
}







export const deleteNote = (noteId) => async (dispatch) => {

    let res= await fetch(`${baseURL}/notes/${noteId}`,{
      method: 'DELETE'
    })

    res = await res.json()

    if(res.success === true){
        dispatch({
            type: DELETE_NOTE,
            id: noteId
      })
    }else{
      alert("Could not delets the note.")
    }
  }