import { GET_ORDER_REQUEST, 
    GET_ORDER_SUCCESS, 
    GET_ORDER_FAILED,
    DELETE_ORDER_ITEM
 } from '../actions/order-action'

export const initialState = {
    order: {},
    orderRequest: false,
    orderFailed: false
}

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ORDER_REQUEST: {
            return {
                ...state,
                orderRequest: true,
                orderFailed: false,
            };
        }
        case GET_ORDER_SUCCESS: {
            return {
                ...state,
                order: action.data,
                orderRequest: false
            };
        }
        case GET_ORDER_FAILED: {
            return {
                ...state,
                orderFailed: true,
                orderRequest: false
            };
        }

        case DELETE_ORDER_ITEM: {
            return{
                ...state,
                order:{}
            }
        }

        default: {
            return state
        }
    }
}