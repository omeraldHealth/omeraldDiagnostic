import { combineReducers } from 'redux'
import { diagnosticReducer } from './diagnosticReducer'
import {loginReducer} from './loginReducer'
import {dashboardReducer} from './dashboard'

export default combineReducers({loginReducer,diagnosticReducer,dashboardReducer})