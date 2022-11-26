import { POST_REGISTRATION_FAILED,
    POST_REGISTRATION_REQUEST,
    POST_REGISTRATION_SUCCESS
 } from '../actions/registration-action'

 export type TRegistrationState = {
    success: boolean;
    user: TRegistrationUser;
    message: string;
    postRequest: boolean;
    postFailed: boolean;
}

export type TRegistrationUser = {
    email:string;
    name:string;
}

export const initialState = {
    success: false,
    user: {
        email:'',
        name:''
    },
    message: '',
    postRequest: false,
    postFailed: false
}

export const registrationReducer = (state = initialState, action : any) : TRegistrationState => {
    switch (action.type) {
        case POST_REGISTRATION_REQUEST: {
            return {
                ...state,
                postRequest: true,
                postFailed: false,
            };
        }
        case POST_REGISTRATION_SUCCESS: {
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
        case POST_REGISTRATION_FAILED: {
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
