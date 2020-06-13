import {LOAD_NOTES, DELETE_NOTE} from '../actions'




const notes = (state = [], action) => {
    switch (action.type) {
        case LOAD_NOTES:
            return [ ...state, ...action.notes ]

        case DELETE_NOTE:
            return [...state.filter(note=> note.noteId !== action.id)]

        default:
            return state
    }
}

export default notes