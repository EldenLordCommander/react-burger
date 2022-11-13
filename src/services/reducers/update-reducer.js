import { PATCH_USER_FAILED,
    PATCH_USER_REQUEST,
    PATCH_USER_SUCCESS
 } from '../actions/update-action'

export const initialState = {
    success: false,
    user: {
        email:'',
        name:''
    },
    postRequest: false,
    postFailed: false
}

export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
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
                success: action.data.success,
                message: action.data.message,
                postFailed: true,
                postRequest: false
            };
        }

        default: {
            return state
        }
    }
}
