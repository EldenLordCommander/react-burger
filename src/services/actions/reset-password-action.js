import { setPassword } from '../../utils/burger-api'

export const POST_RESET_REQUEST = 'POST_RESET_REQUEST';
export const POST_RESET_SUCCESS = 'POST_RESET_SUCCESS';
export const POST_RESET_FAILED = 'POST_RESET_FAILED';
export const SAVE_PASSWORD = 'SAVE_PASSWORD';

export function savePassword(form) {
    return function (dispatch) {
        dispatch({
            type: POST_RESET_REQUEST
        })
        setPassword(form).then(res => {
            if (res) {
                dispatch({
                    type: POST_RESET_SUCCESS,
                    data: res
                })
            } else {
                throw new Error(res.errorMessage)
            }
        }).catch(err => {
            dispatch({
                type: POST_RESET_FAILED
            })
        })
    }
} 