import {combineReducers} from 'redux'

import authReducer from './auth'
import noteReducer from './notes'

const rootReducer = combineReducers({
  auth: authReducer,
  notes: noteReducer,
})

export default rootReducer