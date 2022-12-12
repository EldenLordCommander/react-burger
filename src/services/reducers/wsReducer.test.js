import {
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_START,
    WS_GET_ORDERS
} from '../actions/wsActions';
import { wsReducer, initialState } from '../reducers/wsReducer'
import { testWSOrders } from './reducers-test-data';

describe('constructor reducer', () => {
    it('should return the initial state', () => {
        expect(wsReducer(undefined, {})).toEqual(initialState)
    })

    it('WS_CONNECTION_SUCCESS', () => {
        expect(
            wsReducer(undefined, {
                type: WS_CONNECTION_SUCCESS
            })
        ).toEqual(
            {
                wsConnected: true,
                orders: {}
            }
        )
    });

    it('WS_CONNECTION_ERROR', () => {
        expect(
            wsReducer(undefined, {
                type: WS_CONNECTION_ERROR
            })
        ).toEqual(
            {
                wsConnected: false,
                orders: {}
            }
        )
    });

    it('WS_CONNECTION_CLOSED', () => {
        expect(
            wsReducer(undefined, {
                type: WS_CONNECTION_CLOSED
            })
        ).toEqual(
            {
                wsConnected: false,
                orders: {}
            }
        )
    });

    it('WS_CONNECTION_START', () => {
        expect(
            wsReducer(undefined, {
                type: WS_CONNECTION_START
            })
        ).toEqual(
            {
                wsConnected: true,
                orders: {}
            }
        )
    });

    it('WS_GET_ORDERS', () => {
        expect(
            wsReducer(undefined, {
                type: WS_GET_ORDERS,
                payload: testWSOrders
            })
        ).toEqual(
            {
                wsConnected: false,
                orders: testWSOrders
            }
        )
    });
}) 