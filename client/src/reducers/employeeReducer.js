import { GET_EMPLOYEES, ADD_EMPLOYEE, DELETE_EMPLOYEE, EMPLOYEES_LOADED, EMPLOYEES_LOADING } from '../actions/types'


const initialState = {
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
                latitude: 51.2323232,
                longitude: 4.2323232
            }
        },
        {
            national_id: '910523521232',
            name: 'Chong Chee Keong',
            phone_number: '0139876543',
            email: 'chong@iboss.com',
            current_task: 'field tech support',
            position: {
                latitude: 51.2323232,
                longitude: 4.2323232
            }
        },
        {
            national_id: '930210424242',
            name: 'Krishnasamy Raja',
            phone_number: '0145648909',
            email: 'krishnasamy@iboss.com',
            current_task: 'device installation',
            position: {
                latitude: 51.2323232,
                longitude: 4.2323232
            }
        }
    ]

}

export default function (state = initialState, action) {
    switch (action.tyoe) {
        case GET_EMPLOYEES:
            return {
                ...state
            }
        default:
            return state;
    }
}