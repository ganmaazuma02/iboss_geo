import axios from 'axios'
import { GET_EMPLOYEES, ADD_EMPLOYEE, DELETE_EMPLOYEE, EMPLOYEES_LOADING, EMPLOYEES_LOADED, GET_EMPLOYEE } from './types'
import { tokenConfig } from './authActions'
import { returnErrors } from './errorActions'

export const getEmployees = () => (dispatch, getState) => {
    axios.get('/api/employees', tokenConfig(getState))
        .then(res =>
            dispatch({
                type: GET_EMPLOYEES,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
}

export const getEmployee = (national_id) => (dispatch, getState) => {
    axios.get(`/api/users/${national_id}`, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: GET_EMPLOYEE,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
}

export const addEmployee = (employee) => (dispatch, getState) => {

}

export const deleteEmployee = (id) => (dispatch, getState) => {

}
