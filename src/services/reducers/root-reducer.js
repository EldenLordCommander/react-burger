import { combineReducers } from 'redux';
import { ingredientReducer } from './ingredients-reducers'
import { orderReducer } from './order-reducer';
import { constructorReducer } from './constructor-reducer';
import { modalReducer } from './modal-reducer';

export const rootReducer = combineReducers({
    ingredient: ingredientReducer,
    order: orderReducer,
    burgerConstructor: constructorReducer,
    modal: modalReducer,
  });
  