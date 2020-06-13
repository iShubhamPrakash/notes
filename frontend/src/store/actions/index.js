import { baseURL } from '../../constants/baseConstants'

// Action Types
export const LOAD_NOTES = 'LOAD_NOTES'



// CREATE_NOTE
// EDIT_NOTES
// DELETE_NOTE
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