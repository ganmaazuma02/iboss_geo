import { GET_EMPLOYEES, ADD_EMPLOYEE, DELETE_EMPLOYEE, EMPLOYEES_LOADED, EMPLOYEES_LOADING, GET_EMPLOYEE } from '../actions/types'


const initialState = {
    isEmployeeSelected: false,
    selectedEmployee: null,
    employeeMap: '',
    employeeList: [],
    current_task: '',
    current_location: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_EMPLOYEES:
            return {
                ...state,
                employeeList: action.payload
            }
        case GET_EMPLOYEE:
            return {
                ...state,
                selectedEmployee: action.payload.user,
                isEmployeeSelected: true,
                current_task: action.payload.latest_locations ? action.payload.latest_locations[0].current_task : 'no task',
                current_location: action.payload.latest_locations ? { latitude: action.payload.latest_locations[0].latitude, longitude: action.payload.latest_locations[0].longitude } : { latitude: null, longitude: null }, // TODO: Error handling
                employeeMap: `https://maps.googleapis.com/maps/api/staticmap?center=${action.payload.latest_locations[0].latitude},${action.payload.latest_locations[0].longitude}&zoom=13&size=800x400&sensor=false&markers=color:red%7Clabel:C%7C${action.payload.latest_locations[0].latitude},${action.payload.latest_locations[0].longitude}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
            }
        default:
            return state;
    }
}