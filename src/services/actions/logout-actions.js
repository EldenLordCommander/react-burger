import { logout } from '../../utils/burger-api'

export const POST_LOGOUT_REQUEST = 'POST_LOGOUT_REQUEST';
export const POST_LOGOUT_SUCCESS = 'POST_LOGOUT_SUCCESS';
export const POST_LOGOUT_FAILED = 'POST_LOGOUT_FAILED';

export function logoutUser() {
    return function (dispatch) {
        dispatch({
            type: POST_LOGOUT_REQUEST
        })
        logout().then(res => {
            if (res) {
                dispatch({
                    type: POST_LOGOUT_SUCCESS,
                    data: res
                })
            } else {
                throw new Error(res.errorMessage)
            }
        }).catch(err => {
            dispatch({
                type: POST_LOGOUT_FAILED
            })
        })
    }
} 