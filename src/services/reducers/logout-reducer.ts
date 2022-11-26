import { POST_LOGOUT_FAILED,
    POST_LOGOUT_REQUEST,
    POST_LOGOUT_SUCCESS
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

export const logoutReducer = (state = initialState, action : any) : TLogoutState => {
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
                success: action.data.success,
                message: action.data.message,
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
