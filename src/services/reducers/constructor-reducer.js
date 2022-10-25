import { 
    ADD_BUN_ITEM,
    DELETE_BUN_ITEM,
    ADD_COMPONENT_ITEM,
    DELETE_COMPONENT_ITEM,

    UPDATE_CONSTRUCTOR_LIST
 } from '../actions/constructor-actions'

export const initialState = {
    dataConstructor: {
        bun:[],
        components:[]
    },
    total:0
}

export const constructorReducer = (state = initialState, action) => {
    switch (action.type) {

        case ADD_BUN_ITEM: {
            return{
                ...state,
                dataConstructor:{
                    ...state.dataConstructor,
                    bun: [
                        ...state.dataConstructor.bun,
                        action.payload
                    ],
                } ,
                total: state.total + parseFloat(action.payload.item.price)*2,
            }
        }
        case DELETE_BUN_ITEM: {
            return{
                ...state,
                dataConstructor:{
                    ...state.dataConstructor,
                    bun: [],
                } ,
                total: state.total - parseFloat(state.dataConstructor.bun[0].item.price)*2
            }
        }

        case ADD_COMPONENT_ITEM: {
            return{
                ...state,
                dataConstructor:{
                    ...state.dataConstructor,
                    components: [
                        ...state.dataConstructor.components,
                        action.payload
                    ],
                } ,
                total: state.total + parseFloat(action.payload.item.price),
            }
        }
        case DELETE_COMPONENT_ITEM: {
            return{
                ...state,
                dataConstructor:{
                    ...state.dataConstructor,
                    components: state.dataConstructor.components.filter(element => element.uid !== action.payload.uid),
                } ,
                total: state.total - parseFloat(action.payload.item.price)
            }
        }

        case UPDATE_CONSTRUCTOR_LIST: {
            return{
                ...state,
                dataConstructor:{
                    ...state.dataConstructor,
                    components: action.payload,
                } ,
            }
        }

        default: {
            return state
        }
    }
}