import {LOAD_NOTES, DELETE_NOTE, TOGGLE_PIN, CREATE_NOTE, EDIT_NOTES} from '../actions'




const notes = (state = [], action) => {
    switch (action.type) {
        case LOAD_NOTES:
            return [ ...state, ...action.notes ]

        case DELETE_NOTE:
            return state.filter(note=> note.noteId !== action.id)

        case TOGGLE_PIN:
            return state.map(note=> note.noteId !== action.id ? note : Object.assign(note, {pinned: !note.pinned}))

        case CREATE_NOTE:
            return [action.note, ...state]

        case EDIT_NOTES:
            return state.map(note=> note.noteId !== action.id ? note : action.note)

        default:
            return state
    }
}

export default notes