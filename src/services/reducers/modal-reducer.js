import { GET_MODAL_ITEM,
    DELETE_MODAL_ITEM
 } from '../actions/modal-actions'

export const initialState = {
    modalItem:{}
}

export const modalReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_MODAL_ITEM: {
            return{
                ...state,
                modalItem: action.item,
            }
        }
        case DELETE_MODAL_ITEM: {
            return{
                ...state,
                modalItem: {}
            }
        }

        default: {
            return state
        }
    }
}