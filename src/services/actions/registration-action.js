import { registerUser } from '../../utils/burger-api'

export const POST_REGISTRATION_REQUEST = 'POST_REGISTRATION_REQUEST';
export const POST_REGISTRATION_SUCCESS = 'POST_REGISTRATION_SUCCESS';
export const POST_REGISTRATION_FAILED = 'POST_REGISTRATION_FAILED';

export function savePassword(form) {
    return function (dispatch) {
        dispatch({
            type: POST_REGISTRATION_REQUEST
        })
        registerUser(form).then(res => {
            if (res) {
                dispatch({
                    type: POST_REGISTRATION_SUCCESS,
                    data: res
                })
            } else {
                throw new Error(res.errorMessage)
            }
        }).catch(err => {
            dispatch({
                type: POST_REGISTRATION_FAILED
            })
        })
    }
} 