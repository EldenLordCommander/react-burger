import {
    POST_LOGIN_REQUEST,
    POST_LOGIN_SUCCESS,
    POST_LOGIN_FAILED
} from '../actions/login-action'

import {
    PATCH_USER_FAILED,
    PATCH_USER_REQUEST,
    PATCH_USER_SUCCESS
} from '../actions/update-action'

import {
    POST_USER_FAILED,
    POST_USER_REQUEST,
    POST_USER_SUCCESS,
    CLEAR_USER_DATA
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

export const loginReducer = (state = initialState, action: any) : TLoginState => {
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
                success: action.data.success,
                message: action.data.message,
                user: {
                    email: action.data.user.email,
                    name: action.data.user.name
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
                success: action.data.success,
                message: action.data.message,
                user: {
                    email: action.data.user.email,
                    name: action.data.user.name
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
                success: action.data.success,
                message: action.data.message,
                user: {
                    email: action.data.user.email,
                    name: action.data.user.name
                },
                postRequest: false
            };
        }
        case POST_USER_SUCCESS: {
            return {
                ...state,
                success: action.data.success,
                message: action.data.message,
                user: {
                    email: '',
                    name: ''
                },
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
