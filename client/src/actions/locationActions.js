import axios from 'axios'
import { ADD_LOCATION } from './types'
import { tokenConfig } from './authActions'
import { returnErrors } from './errorActions'


export const addLocation = (location) => (dispatch, getState) => {
    axios.post('/api/locations', location, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: ADD_LOCATION,
                payload: res.data
            })
        ).catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
}