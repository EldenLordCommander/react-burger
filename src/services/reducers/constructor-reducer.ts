import { TIngredientType } from '../../utils/types'

import {
    ADD_BUN_ITEM,
    DELETE_BUN_ITEM,
    ADD_COMPONENT_ITEM,
    DELETE_COMPONENT_ITEM,

    UPDATE_CONSTRUCTOR_LIST,
    TConstructorActions
} from '../actions/constructor-actions'

export type TConstrunctorItem =  {
    item : TIngredientType;
    uid : string;
}

export type TDataConstructor = {
    bun: TConstrunctorItem[];
    components: TConstrunctorItem[];
}

export type TConstrunctorState = {
    dataConstructor: TDataConstructor;
    total: number;
}

export const initialState = {
    dataConstructor: {
        bun: [] as Array<TConstrunctorItem>,
        components: [] as Array<TConstrunctorItem>
    },
    total: 0
}

export const constructorReducer = (state = initialState, action: TConstructorActions) : TConstrunctorState => {
    switch (action.type) {

        case ADD_BUN_ITEM: {
            return {
                ...state,
                dataConstructor: {
                    ...state.dataConstructor,
                    bun: [
                        ...state.dataConstructor.bun,
                        action.payload
                    ],
                },
                total: state.total + action.payload.item.price * 2,
            }
        }
        case DELETE_BUN_ITEM: {
            return {
                ...state,
                dataConstructor: {
                    ...state.dataConstructor,
                    bun: [],
                },
                total: state.total - state.dataConstructor.bun[0].item.price * 2
            }
        }

        case ADD_COMPONENT_ITEM: {
            return {
                ...state,
                dataConstructor: {
                    ...state.dataConstructor,
                    components: [
                        ...state.dataConstructor.components,
                        action.payload
                    ],
                },
                total: state.total + action.payload.item.price,
            }
        }
        case DELETE_COMPONENT_ITEM: {
            return {
                ...state,
                dataConstructor: {
                    ...state.dataConstructor,
                    components: state.dataConstructor.components.filter(element => element.uid !== action.payload.uid),
                },
                total: state.total - action.payload.item.price
            }
        }

        case UPDATE_CONSTRUCTOR_LIST: {
            return {
                ...state,
                dataConstructor: {
                    ...state.dataConstructor,
                    components: action.payload,
                },
            }
        }

        default: {
            return state
        }
    }
}