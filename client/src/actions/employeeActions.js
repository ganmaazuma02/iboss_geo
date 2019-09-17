import axios from 'axios'
import { GET_EMPLOYEES, ADD_EMPLOYEE, DELETE_EMPLOYEE, EMPLOYEES_LOADING, EMPLOYEES_LOADED } from './types'

export const getEmployees = () => dispatch => {
    return {
        type: GET_EMPLOYEES
    }
}

export const addEmployee = (employee) => (dispatch, getState) => {

}

export const deleteEmployee = (id) => (dispatch, getState) => {

}
