import { TOrder, TOrderRequest } from '../../utils/types';
import {
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_START,
    WS_GET_ORDERS,
    TWSActions
} from '../actions/wsActions';

export type TWSReducerState = {
    wsConnected: boolean;
    orders: TOrderRequest;
}

const initialState = {
    wsConnected: false,
    orders: {} as TOrderRequest
};

export const wsReducer = (state = initialState, action : TWSActions) : TWSReducerState => {
    switch (action.type) {
        case WS_CONNECTION_START:
            return {
                ...state,
                wsConnected: true
            };
        case WS_CONNECTION_SUCCESS:
            return {
                ...state,
                wsConnected: true
            };

        case WS_CONNECTION_ERROR:
            return {
                ...state,
                wsConnected: false
            };

        case WS_CONNECTION_CLOSED:
            return {
                ...state,
                wsConnected: false
            };

        case WS_GET_ORDERS:
            return {
                ...state,
                orders: action.payload
            };

        default:
            return state;
    }
};