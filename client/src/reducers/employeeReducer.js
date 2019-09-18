import { GET_EMPLOYEES, ADD_EMPLOYEE, DELETE_EMPLOYEE, EMPLOYEES_LOADED, EMPLOYEES_LOADING, GET_EMPLOYEE } from '../actions/types'


const initialState = {
    isEmployeeSelected: false,
    selectedEmployee: null,
    employeeMap: '',
    employeeList: [
        {
            national_id: '920403074322',
            name: 'Ali Abd Rahim'
        },
        {
            national_id: '910523521232',
            name: 'Chong Chee Keong'
        },
        {
            national_id: '930210424242',
            name: 'Krishnasamy Raja'
        }
    ],
    employeeDetails: [
        {
            national_id: '920403074322',
            name: 'Ali Abd Rahim',
            phone_number: '0123456789',
            email: 'ali@iboss.com',
            current_task: 'sales',
            position: {
                latitude: 5.6436,
                longitude: 100.4894
            }
        },
        {
            national_id: '910523521232',
            name: 'Chong Chee Keong',
            phone_number: '0139876543',
            email: 'chong@iboss.com',
            current_task: 'field tech support',
            position: {
                latitude: 5.4356,
                longitude: 100.3091
            }
        },
        {
            national_id: '930210424242',
            name: 'Krishnasamy Raja',
            phone_number: '0145648909',
            email: 'krishnasamy@iboss.com',
            current_task: 'device installation',
            position: {
                latitude: 5.3655,
                longitude: 100.4590
            }
        }
    ]

}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_EMPLOYEES:
            return {
                ...state
            }
        case GET_EMPLOYEE:
            const employee = state.employeeDetails.find(employee => employee.national_id === action.payload);
            return {
                ...state,
                selectedEmployee: employee,
                isEmployeeSelected: true,
                employeeMap: `https://maps.googleapis.com/maps/api/staticmap?center=${employee.position.latitude},${employee.position.longitude}&zoom=13&size=800x400&sensor=false&markers=color:red%7Clabel:C%7C${employee.position.latitude},${employee.position.longitude}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
            }
        default:
            return state;
    }
}