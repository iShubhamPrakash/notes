import {LOAD_NOTES} from '../actions'




const notes = (state = [], action) => {
    switch (action.type) {
        case LOAD_NOTES:
            return [ ...state, ...action.notes ]
        default:
            return state
    }
}

export default notes