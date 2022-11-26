import { TIngredientType } from '../../utils/types'
import {
    GET_DATA_REQUEST,
    GET_DATA_SUCCESS,
    GET_DATA_FAILED,
} from '../actions/ingredients-actions'


export type TIngredientState = {
    data: Array<TIngredientType>,
    dataRequest: boolean;
    dataFailed: boolean;
}

export const initialState = {
    data: [],
    dataRequest: false,
    dataFailed: false,

}

export const ingredientReducer = (state = initialState, action: any) : TIngredientState => {
    switch (action.type) {
        case GET_DATA_REQUEST: {
            return {
                ...state,
                dataRequest: true,
                dataFailed: false,
            };
        }
        case GET_DATA_SUCCESS: {
            return {
                ...state,
                data: action.data,
                dataRequest: false
            };
        }
        case GET_DATA_FAILED: {
            return {
                ...state,
                dataFailed: true,
                dataRequest: false
            };
        }

        default: {
            return state
        }
    }
}