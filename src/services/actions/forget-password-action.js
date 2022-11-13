import { resetPassword } from '../../utils/burger-api'

export const POST_PASSWORD_REQUEST = 'POST_PASSWORD_REQUEST';
export const POST_PASSWORD_SUCCESS = 'POST_PASSWORD_SUCCESS';
export const POST_PASSWORD_FAILED = 'POST_PASSWORD_FAILED';

export function reset(email) {
    return function (dispatch) {
        dispatch({
            type: POST_PASSWORD_REQUEST
        })
        resetPassword(email).then(res => {
            if (res) {
                dispatch({
                    type: POST_PASSWORD_SUCCESS,
                    data: res
                })
            } else {
                throw new Error(res.errorMessage)
            }
        }).catch(err => {
            dispatch({
                type: POST_PASSWORD_FAILED
            })
        })
    }
} 