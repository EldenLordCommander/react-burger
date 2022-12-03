import { combineReducers } from 'redux';
import { ingredientReducer } from './ingredients-reducers'
import { orderReducer } from './order-reducer';
import { constructorReducer } from './constructor-reducer';
import { modalReducer } from './modal-reducer';
import { forgetPasswordReducer } from './forget-password-reducer';
import { registrationReducer } from './registration-reducer';
import { loginReducer } from './login-reducer'
import { resetPasswordReducer } from './reset-password-reducer';
import { logoutReducer } from './logout-reducer';
import { wsReducer } from './wsReducer';



export const rootReducer = combineReducers({
    ingredient: ingredientReducer,
    order: orderReducer,
    burgerConstructor: constructorReducer,
    modal: modalReducer,
    forgetPassword: forgetPasswordReducer,
    registration: registrationReducer,
    login: loginReducer,
    reset: resetPasswordReducer,
    logout: logoutReducer,
    wsReducer: wsReducer
  });
  