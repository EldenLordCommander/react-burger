import {
    GET_DATA_REQUEST,
    GET_DATA_SUCCESS,
    GET_DATA_FAILED,
    TGetDataActions,
} from '../actions/ingredients-actions'
import { initialState, ingredientReducer } from '../reducers/ingredients-reducers'
import { testDataArray } from './reducers-test-data'

describe('constructor reducer', () => {
    it('should return the initial state', () => {
        expect(ingredientReducer(undefined, {})).toEqual(initialState)
    })

    it('GET_DATA_REQUEST', () => {
        expect(
            ingredientReducer(undefined, {
                type: GET_DATA_REQUEST
            })
        ).toEqual(
            {
                data: [],
                dataRequest: true,
                dataFailed: false,
            }
        )
    });

    it('GET_DATA_SUCCESS', () => {
        expect(
            ingredientReducer(undefined, {
                type: GET_DATA_SUCCESS,
                data: testDataArray
            })
        ).toEqual(
            {
                data: testDataArray,
                dataRequest: false,
                dataFailed: false
            }
        )
    });

    it('GET_DATA_FAILED', () => {
        expect(
            ingredientReducer(undefined, {
                type: GET_DATA_FAILED
            })
        ).toEqual(
            {
                data: [],
                dataRequest: false,
                dataFailed: true,
            }
        )
    });
}) 