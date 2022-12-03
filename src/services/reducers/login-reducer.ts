import {
    POST_LOGIN_REQUEST,
    POST_LOGIN_SUCCESS,
    POST_LOGIN_FAILED,
    TPostLoginActions
} from '../actions/login-action'

import {
    PATCH_USER_FAILED,
    PATCH_USER_REQUEST,
    PATCH_USER_SUCCESS,
    TPatchUserActions
} from '../actions/update-action'

import {
    POST_USER_FAILED,
    POST_USER_REQUEST,
    POST_USER_SUCCESS,
    CLEAR_USER_DATA,
    TPostUserActions
} from '../actions/user-action'

export type TLoginData = {
    email: string;
    name: string;
    password?: string;
}

export type TLoginState = {
    success: boolean;
    message: string,
    user?: TLoginData;
    postRequest: boolean;
    postFailed: boolean;
}

export const initialState = {
    success: false,
    message: '',
    user: undefined,
    postRequest: false,
    postFailed: false
}

export const loginReducer = (state = initialState, action: TPostLoginActions | TPatchUserActions | TPostUserActions) : TLoginState => {
    switch (action.type) {
        case POST_LOGIN_REQUEST: {
            return {
                ...state,
                postRequest: true,
                postFailed: false,
            };
        }
        case POST_LOGIN_SUCCESS: {
            return {
                ...state,
                success: action.success,
                message: action.message,
                user: {
                    email: action.user.email,
                    name: action.user.name
                },
                postRequest: false
            };
        }
        case POST_LOGIN_FAILED: {
            return {
                ...state,
                postFailed: true,
                postRequest: false
            };
        }

        case PATCH_USER_REQUEST: {
            return {
                ...state,
                postRequest: true,
                postFailed: false,
            };
        }
        case PATCH_USER_SUCCESS: {
            return {
                ...state,
                success: action.success,
                message: action.message,
                user: {
                    email: action.user.email,
                    name: action.user.name
                },
                postRequest: false
            };
        }
        case PATCH_USER_FAILED: {
            return {
                ...state,
                postFailed: true,
                postRequest: false
            };
        }

        case POST_USER_REQUEST: {
            return {
                ...state,
                postRequest: true,
                postFailed: false,
            };
        }
        case POST_USER_SUCCESS: {
            return {
                ...state,
                success: action.success,
                message: action.message,
                user: {
                    email: action.user.email,
                    name: action.user.name
                },
                postRequest: false
            };
        }
        case POST_USER_FAILED: {
            return {
                ...state,
                postFailed: true,
                postRequest: false
            };
        }
        case CLEAR_USER_DATA: {
            return {
                ...state,
                success: false,
                user: undefined
            };
        }



        default: {
            return state
        }
    }
}
