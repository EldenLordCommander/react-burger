import { getOrderId } from '../../utils/burger-api'

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';
export const DELETE_ORDER_ITEM = 'DELETE_ORDER_ITEM';

export function getOrder(clickedIngredients) {
    return function (dispatch) {
        dispatch({
            type: GET_ORDER_REQUEST
        })
        getOrderId(clickedIngredients).then(res => {
            if (res) {
                dispatch({
                    type: GET_ORDER_SUCCESS,
                    data: res
                })
            } else {
                dispatch({
                    type: GET_ORDER_FAILED
                })
            }
        }).catch(err => {
            dispatch({
                type: GET_ORDER_FAILED
            })
        })
    }
} 