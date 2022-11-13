import { login } from '../../utils/burger-api'

export const POST_LOGIN_REQUEST = 'POST_LOGIN_REQUEST';
export const POST_LOGIN_SUCCESS = 'POST_LOGIN_SUCCESS';
export const POST_LOGIN_FAILED = 'POST_LOGIN_FAILED';

export function loginUser(form) {
    return function (dispatch) {
        dispatch({
            type: POST_LOGIN_REQUEST
        })
        login(form).then(res => {
            if (res) {
                dispatch({
                    type: POST_LOGIN_SUCCESS,
                    data: res
                })
            } else {
                throw new Error(res.errorMessage)
            }
        }).catch(err => {
            dispatch({
                type: POST_LOGIN_FAILED
            })
        })
    }
} 