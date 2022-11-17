import { GET_ORDER_REQUEST, 
    GET_ORDER_SUCCESS, 
    GET_ORDER_FAILED,
    DELETE_ORDER_ITEM
 } from '../actions/order-action'

export type TOrder = {
    success: boolean;
    name: string;
    order: {
        number: number
    }
}

export type TOrderState = {
    order: TOrder | any,
    orderRequest: boolean;
    orderFailed: boolean;
}

export const initialState = {
    order: {} as TOrder ,
    orderRequest: false,
    orderFailed: false
}

export const orderReducer = (state = initialState, action: any) : TOrderState => {
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