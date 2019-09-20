import { combineReducers } from 'redux'
import employeeReducer from './employeeReducer'
import authReducer from './authReducer'
import errorReducer from './errorReducer'
import locationReducer from './locationReducer'

export default combineReducers({
    employee: employeeReducer,
    error: errorReducer,
    auth: authReducer,
    location: locationReducer
});