import { getIngredients, getOrderId } from '../../utils/burger-api'

export const GET_DATA_REQUEST = 'GET_DATA_REQUEST';
export const GET_DATA_SUCCESS = 'GET_DATA_SUCCESS';
export const GET_DATA_FAILED = 'GET_DATA_FAILED';

// export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
// export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
// export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';
// export const DELETE_ORDER_ITEM = 'DELETE_ORDER_ITEM';
// export const GET_MODAL_ITEM = 'GET_ITEM_MODAL';
// export const DELETE_MODAL_ITEM = 'DELETE_MODAL_ITEM';
// export const ADD_BUN_ITEM = 'ADD_BUN_ITEM';
// export const DELETE_BUN_ITEM = 'DELETE_BUN_ITEM';
// export const ADD_COMPONENT_ITEM = 'ADD_COMPONENT_ITEM';
// export const DELETE_COMPONENT_ITEM = 'DELETE_COMPONENT_ITEM';
// export const UPDATE_CONSTRUCTOR_LIST="UPDATE_CONSTRUCTOR_LIST";





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
                dispatch({
                    type: GET_DATA_FAILED
                })
            }
        }).catch(err => {
            dispatch({
                type: GET_DATA_FAILED
            })
        })
    }
} 


// export function getOrder(clickedIngredients) {
//     return function (dispatch) {
//         dispatch({
//             type: GET_ORDER_REQUEST
//         })
//         getOrderId(clickedIngredients).then(res => {
//             if (res) {
//                 dispatch({
//                     type: GET_ORDER_SUCCESS,
//                     data: res
//                 })
//             } else {
//                 dispatch({
//                     type: GET_ORDER_FAILED
//                 })
//             }
//         }).catch(err => {
//             dispatch({
//                 type: GET_ORDER_FAILED
//             })
//         })
//     }
// } 