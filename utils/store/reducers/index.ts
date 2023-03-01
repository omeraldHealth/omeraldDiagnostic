import { combineReducers } from 'redux'
import { diagnosticReducer } from './diagnosticReducer'
import {loginReducer} from './loginReducer'

export default combineReducers({loginReducer,diagnosticReducer})