import { getUser, fetchWithRefresh } from '../../utils/burger-api'

export const POST_USER_REQUEST = 'POST_USER_REQUEST';
export const POST_USER_SUCCESS = 'POST_USER_SUCCESS';
export const POST_USER_FAILED = 'POST_USER_FAILED';
export const CLEAR_USER_DATA = 'CLEAR_USER_DATA';

export function getCurrentUser() {
    return function (dispatch) {
        dispatch({
            type: POST_USER_REQUEST
        })
        getUser().then(res => {
            //console.log(res);
            if (res) {
                dispatch({
                    type: POST_USER_SUCCESS,
                    data: res
                })
            } else {
                throw new Error(res.errorMessage)
            }
        }).catch(err => {
            dispatch({
                type: POST_USER_FAILED
            })
        })
    }
} 

export function getUserWithRefresh(){
    return function (dispatch) {
        dispatch({
            type: POST_USER_REQUEST
        })
        fetchWithRefresh().then(res => {
            console.log(res);
            if (res) {
                dispatch({
                    type: POST_USER_SUCCESS,
                    data: res
                })
            } else {
                throw new Error(res.errorMessage)
            }
        }).catch(err => {
            dispatch({
                type: POST_USER_FAILED
            })
        })
    }
}