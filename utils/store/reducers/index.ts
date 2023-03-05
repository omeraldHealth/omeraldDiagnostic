import { combineReducers } from 'redux'
import { diagnosticReducer } from './diagnosticReducer'
import {loginReducer} from './loginReducer'
import {dashboardReducer} from './dashboard'
import {reportReducer} from './reports'
import {testReducer} from './test'
import {loadingReducer} from './loadingReducer'
import {reportListReducer} from './reportList'
import {reportFormReducer} from './reportForm'

export default combineReducers({loadingReducer,loginReducer,diagnosticReducer,dashboardReducer,reportReducer,reportFormReducer,testReducer,reportListReducer})