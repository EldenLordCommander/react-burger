import {
    ADD_BUN_ITEM,
    DELETE_BUN_ITEM,
    ADD_COMPONENT_ITEM,
    DELETE_COMPONENT_ITEM,
    UPDATE_CONSTRUCTOR_LIST
} from '../actions/constructor-actions'
import { initialState, constructorReducer } from '../reducers/constructor-reducer'
import { testBun, testConstructorBun, testConstructorComponent, testConstructorComponents } from './reducers-test-data'

describe('constructor reducer', () => {
    it('should return the initial state', () => {
        expect(constructorReducer(undefined, {})).toEqual(initialState)
    })

    it('ADD_BUN_ITEM', () => {
        expect(
            constructorReducer(undefined, {
                type: ADD_BUN_ITEM,
                payload: testConstructorBun
            })
        ).toEqual(
            {
                dataConstructor: {
                    ...initialState.dataConstructor,
                    bun: [
                        testConstructorBun,
                    ]
                },
                total: testConstructorBun.item.price * 2,
            }
        )
    });

    it('DELETE_BUN_ITEM', () => {
        expect(
            constructorReducer(initialState, {
                type: DELETE_BUN_ITEM,
                payload: {
                    item: testConstructorBun,
                    uid: '1'
                }
            })
        ).toEqual(
            {
                ...initialState,
                dataConstructor: {
                    ...initialState.dataConstructor,
                    bun: []
                },
                total: 0 - parseFloat(testConstructorBun.price)*2,
            }
        )
    });

    it('ADD_COMPONENT_ITEM', () => {
        expect(
            constructorReducer(undefined, {
                type: ADD_COMPONENT_ITEM,
                payload: testConstructorComponent
            })
        ).toEqual(
            {
                dataConstructor: {
                    ...initialState.dataConstructor,
                    components: [
                        testConstructorComponent,
                    ]
                },
                total: testConstructorComponent.item.price,
            }
        )
    });

    it('DELETE_COMPONENT_ITEM', () => {
        expect(
            constructorReducer(initialState, {
                type: DELETE_COMPONENT_ITEM,
                payload: {
                    item: testConstructorBun,
                    uid: '1'
                }
            })
        ).toEqual(
            {
                ...initialState,
                dataConstructor: {
                    ...initialState.dataConstructor,
                    components: []
                },
                total: 0 - parseFloat(testConstructorBun.price),
            }
        )
    });

    it('UPDATE_CONSTRUCTOR_LIST', () => {
        expect(
            constructorReducer(initialState, {
                type: UPDATE_CONSTRUCTOR_LIST,
                payload: testConstructorComponents
            })
        ).toEqual(
            {
                dataConstructor: {
                    ...initialState.dataConstructor,
                    components: testConstructorComponents
                },
                total:0
            }
        )
    });

    
}) 