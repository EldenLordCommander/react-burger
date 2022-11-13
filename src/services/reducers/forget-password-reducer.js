import { POST_PASSWORD_REQUEST,
    POST_PASSWORD_SUCCESS,
    POST_PASSWORD_FAILED
 } from '../actions/forget-password-action'

export const initialState = {
    success: false,
    message: '',
    postRequest: false,
    postFailed: false
}

export const forgetPasswordReducer = (state = initialState, action) => {
    switch (action.type) {
        case POST_PASSWORD_REQUEST: {
            return {
                ...state,
                postRequest: true,
                postFailed: false,
            };
        }
        case POST_PASSWORD_SUCCESS: {
            return {
                ...state,
                success: action.data.success,
                message: action.data.message,
                postRequest: false
            };
        }
        case POST_PASSWORD_FAILED: {
            return {
                ...state,
                postFailed: true,
                postRequest: false
            };
        }

        default: {
            return state
        }
    }
}