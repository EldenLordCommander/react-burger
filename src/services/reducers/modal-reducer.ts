import { TIngredientType } from '../../utils/types'

import { GET_MODAL_ITEM,
    DELETE_MODAL_ITEM
 } from '../actions/modal-actions'

export type TModalState = {
    modalItem: TIngredientType
}
 
export const initialState = {
    modalItem:{} as TIngredientType
}

export const modalReducer = (state = initialState, action: any) : TModalState => {
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
                modalItem: {} as TIngredientType
            }
        }

        default: {
            return state
        }
    }
}