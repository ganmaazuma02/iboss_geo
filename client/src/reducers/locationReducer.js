import { ADD_LOCATION } from '../actions/types'


const initialState = {
    location: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_LOCATION:
            return {
                ...state,
                location: action.payload
            }
        default:
            return state;
    }
}