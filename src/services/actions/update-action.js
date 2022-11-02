import { updateUserData, updateWithRefresh } from '../../utils/burger-api'

export const PATCH_USER_REQUEST = 'PATCH_USER_REQUEST';
export const PATCH_USER_SUCCESS = 'PATCH_USER_SUCCESS';
export const PATCH_USER_FAILED = 'PATCH_USER_FAILED';

export function updateUser(form) {
    return function (dispatch) {
        dispatch({
            type: PATCH_USER_REQUEST
        })
        updateUserData(form).then(res => {
            if (res) {
                dispatch({
                    type: PATCH_USER_SUCCESS,
                    data: res
                })
            } else {
                throw new Error(res.errorMessage)
            }
        }).catch(err => {
            dispatch({
                type: PATCH_USER_FAILED
            })
        })
    }
} 


export function updateUserWithRefresh(form){
    return function (dispatch) {
        dispatch({
            type: PATCH_USER_REQUEST
        })
        updateWithRefresh(form).then(res => {
            console.log(res);
            if (res) {
                dispatch({
                    type: PATCH_USER_SUCCESS,
                    data: res
                })
            } else {
                throw new Error(res.errorMessage)
            }
        }).catch(err => {
            dispatch({
                type: PATCH_USER_FAILED
            })
        })
    }
}