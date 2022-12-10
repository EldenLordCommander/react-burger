import { POST_RESET_FAILED,
    POST_RESET_SUCCESS,
    POST_RESET_REQUEST,
    TPostResetActions
 } from '../actions/reset-password-action'

export type TResetPasswordState = {
    success: boolean;
    message: string,
    postRequest: boolean;
    postFailed: boolean;
}

export const initialState = {
    success: false,
    message: '',
    postRequest: false,
    postFailed: false
}

export const resetPasswordReducer = (state = initialState, action : TPostResetActions) : TResetPasswordState => {
    switch (action.type) {
        case POST_RESET_REQUEST: {
            return {
                ...state,
                postRequest: true,
                postFailed: false,
            };
        }
        case POST_RESET_SUCCESS: {
            return {
                ...state,
                success: action.success,
                message: action.message,
                postRequest: false
            };
        }
        case POST_RESET_FAILED: {
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