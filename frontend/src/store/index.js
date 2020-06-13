import {createStore} from 'redux'
import rootReducer from './reducers'
import middleware from './middlewares'
import { composeWithDevTools } from 'redux-devtools-extension'

let store = createStore(rootReducer, composeWithDevTools(middleware))


export default store