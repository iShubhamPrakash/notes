import { baseURL } from '../../constants/baseConstants'

// Action Types
export const LOAD_NOTES = 'LOAD_NOTES'
export const DELETE_NOTE = 'DELETE_NOTE'
export const TOGGLE_PIN = 'TOGGLE_PIN'
export const CREATE_NOTE = 'CREATE_NOTE'
export const EDIT_NOTES = 'EDIT_NOTES'

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

export const togglePinStatus = (noteId) => async (dispatch) => {

  let res= await fetch(`${baseURL}/notes/togglePin/${noteId}`,{
    method: 'PUT',
  })

  res = await res.json()

  if(res.success === true){
    dispatch({
        type: TOGGLE_PIN,
        id: noteId
    })
  }else{
    console.log("Could not change the pinned status.. Please try again !!")
  }
  return res
}

export const createNote = ({title,text,pinned}) => async (dispatch) => {

  let newNote = {
    title, text, pinned,
  };
  
  let res = await fetch(`${baseURL}/notes/add`,{
    method: 'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body: JSON.stringify(newNote)
  })

  res = await res.json()

  if(res.success === true){
    dispatch({
        type: CREATE_NOTE,
        note: res.note
    })
  }else{
    console.log("Could not save the note.. please try again!!")
  }
  return res
}

export const editNote = ({ noteId,title,text,pinned }) => async (dispatch) => {

  let res = await fetch(`${baseURL}/notes/${noteId}`,{
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

  res = await res.json()

  if(res.success === true){
    dispatch({
        type: EDIT_NOTES,
        id: noteId,
        note: { noteId, title, text, pinned }
    })
  }else{
    console.log("Could not save the note.. please try again!!")
  }
  return res
}