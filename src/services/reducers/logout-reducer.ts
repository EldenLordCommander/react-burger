import { POST_LOGOUT_FAILED,
    POST_LOGOUT_REQUEST,
    POST_LOGOUT_SUCCESS,
    TPostLogoutActions
 } from '../actions/logout-actions'


export type TLogoutState = {
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

export const logoutReducer = (state = initialState, action : TPostLogoutActions) : TLogoutState => {
    switch (action.type) {
        case POST_LOGOUT_REQUEST: {
            return {
                ...state,
                postRequest: true,
                postFailed: false,
            };
        }
        case POST_LOGOUT_SUCCESS: {
            return {
                ...state,
                success: action.success,
                message: action.message,
                postRequest: false
            };
        }
        case POST_LOGOUT_FAILED: {
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
