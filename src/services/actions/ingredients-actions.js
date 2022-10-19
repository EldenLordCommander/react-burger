import { getIngredients, getOrderId } from '../../utils/burger-api'

export const GET_DATA_REQUEST = 'GET_DATA_REQUEST';
export const GET_DATA_SUCCESS = 'GET_DATA_SUCCESS';
export const GET_DATA_FAILED = 'GET_DATA_FAILED';


export function getData() {
    return function (dispatch) {
        dispatch({
            type: GET_DATA_REQUEST
        })
        getIngredients().then(res => {
            if (res) {
                dispatch({
                    type: GET_DATA_SUCCESS,
                    data: res
                })
            } else {
                throw new Error(res.errorMessage)
            }
        }).catch(err => {
            dispatch({
                type: GET_DATA_FAILED
            })
        })
    }
} 
