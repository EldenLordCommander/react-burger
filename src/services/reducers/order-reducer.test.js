import { GET_ORDER_REQUEST, 
    GET_ORDER_SUCCESS, 
    GET_ORDER_FAILED,
    DELETE_ORDER_ITEM
 } from '../actions/order-action'
 import { initialState, orderReducer } from '../reducers/order-reducer'
import { testOrder } from './reducers-test-data'

 describe('constructor reducer', () => {
     it('should return the initial state', () => {
         expect(orderReducer(undefined, {})).toEqual(initialState)
     })

     it('GET_ORDER_REQUEST', () => {
        expect(
            orderReducer(undefined, {
                type: GET_ORDER_REQUEST
            })
        ).toEqual(
            {
                order:{},
                orderRequest: true,
                orderFailed: false,
            }
        )
    });

    it('GET_ORDER_SUCCESS', () => {
        expect(
            orderReducer(undefined, {
                type: GET_ORDER_SUCCESS,
                data: testOrder
            })
        ).toEqual(
            {
                orderRequest: false,
                orderFailed: false,
                order: testOrder
            }
        )
    });

    it('GET_ORDER_FAILED', () => {
        expect(
            orderReducer(undefined, {
                type: GET_ORDER_FAILED
            })
        ).toEqual(
            {
                order:{},
                orderRequest: false,
                orderFailed: true,
            }
        )
    });

    it('DELETE_ORDER_ITEM', () => {
        expect(
            orderReducer([], {
                type: DELETE_ORDER_ITEM,
                order:{}
            })
        ).toEqual(
            {
                order:{}
            }
        )
    });
 }) 
