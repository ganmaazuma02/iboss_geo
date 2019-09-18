import axios from 'axios'
import { GET_EMPLOYEES, ADD_EMPLOYEE, DELETE_EMPLOYEE, EMPLOYEES_LOADING, EMPLOYEES_LOADED, GET_EMPLOYEE } from './types'

export const getEmployees = () => {
    return {
        type: GET_EMPLOYEES
    }
}

export const getEmployee = (national_id) => {
    return {
        type: GET_EMPLOYEE,
        payload: national_id
    }
}

export const addEmployee = (employee) => (dispatch, getState) => {

}

export const deleteEmployee = (id) => (dispatch, getState) => {

}
