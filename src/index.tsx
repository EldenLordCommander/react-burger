import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/app';
import reportWebVitals from './reportWebVitals';

import { compose, createStore, applyMiddleware, Action, ActionCreator, Dispatch } from 'redux';
import { Provider } from 'react-redux';
import thunk, { ThunkAction } from 'redux-thunk';
import { rootReducer } from './services/reducers/root-reducer';
import { TLoginState } from './services/reducers/login-reducer';
import { TForgetPasswordState } from './services/reducers/forget-password-reducer';
import { TRegistrationState } from './services/reducers/registration-reducer';
import { TResetPasswordState } from './services/reducers/reset-password-reducer';
import { TConstrunctorState } from './services/reducers/constructor-reducer';
import { TIngredientState } from './services/reducers/ingredients-reducers';
import { TOrderState } from './services/reducers/order-reducer';

import { TConstructorActions } from './services/actions/constructor-actions';
import { TForgetPasswordActions } from './services/actions/forget-password-action';
import { TGetDataActions } from './services/actions/ingredients-actions';
import { TPostLoginActions } from './services/actions/login-action';
import { TPatchUserActions } from './services/actions/update-action';
import { TPostUserActions } from './services/actions/user-action';
import { TPostLogoutActions } from './services/actions/logout-actions';
import { TModalActions } from './services/actions/modal-actions';
import { TGetOrderActions } from './services/actions/order-action';
import { TPostRegistrationActions } from './services/actions/registration-action';
import { TPostResetActions } from './services/actions/reset-password-action';
import { WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_CONNECTION_START, WS_CONNECTION_SUCCESS, WS_GET_ORDERS, WS_SEND_MESSAGE } from './services/actions/wsActions';
import { socketMiddleware } from './services/socketMiddleware';
import { wsUrlAll as wsUrl } from './utils/burger-api';
import { TWSReducerState } from './services/reducers/wsReducer';

export const wsActions = {
  wsInit: WS_CONNECTION_START,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_ORDERS,
  onSend: WS_SEND_MESSAGE
};

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(wsActions)));

const store = createStore(rootReducer, enhancer); 

//export type RootState = ReturnType<typeof store.getState>
export type RootState = {
  login: TLoginState;
  forgetPassword: TForgetPasswordState;
  registration: TRegistrationState;
  reset: TResetPasswordState;
  burgerConstructor: TConstrunctorState;
  ingredient: TIngredientState;
  order: TOrderState;
  wsReducer: TWSReducerState;
};

type TApplicationActions = | TConstructorActions
| TForgetPasswordActions
| TGetDataActions
| TPostLoginActions
| TPatchUserActions
| TPostUserActions
| TPostLogoutActions
| TModalActions
| TGetOrderActions
| TPostRegistrationActions
| TPostResetActions;

export type AppDispatch = typeof store.dispatch;
//export type AppDispatch = Dispatch<TApplicationActions>; 

export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  // <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
