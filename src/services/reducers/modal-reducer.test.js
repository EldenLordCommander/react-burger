import { initialState, modalReducer } from "./modal-reducer";
import {
    GET_MODAL_ITEM,
    DELETE_MODAL_ITEM
} from '../actions/modal-actions'
import { testModalItem } from "./reducers-test-data";


describe('modal-action reducer', () => {
    it('should return the initial state', () => {
        expect(modalReducer(undefined, {})).toEqual(initialState)
    })

    it('GET_MODAL_ITEM', () => {
        expect(
            modalReducer(undefined, {
                type: GET_MODAL_ITEM,
                item: testModalItem
            })
        ).toEqual(
            {
                modalItem:testModalItem
            })
    });

    it('DELETE_MODAL_ITEM', () => {
        expect(
            modalReducer([], {
                type: DELETE_MODAL_ITEM,
                modalItem: {}
            })
        ).toEqual(
            {
                modalItem: {}
            }
        )
    })
}) 