import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/app';
import reportWebVitals from './reportWebVitals';

import { compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { rootReducer } from './services/reducers/root-reducer';
import { TLoginState } from './services/reducers/login-reducer';
import { TForgetPasswordState } from './services/reducers/forget-password-reducer';
import { TRegistrationState } from './services/reducers/registration-reducer';
import { TResetPasswordState } from './services/reducers/reset-password-reducer';
import { TConstrunctorState } from './services/reducers/constructor-reducer';
import { TIngredientState } from './services/reducers/ingredients-reducers';
import { TOrderState } from './services/reducers/order-reducer';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(thunk));

const store = createStore(rootReducer, enhancer); 

// Infer the `RootState` and `AppDispatch` types from the store itself
//export type RootState = ReturnType<typeof store.getState>
export type RootState = {
  login: TLoginState;
  forgetPassword: TForgetPasswordState;
  registration: TRegistrationState;
  reset: TResetPasswordState;
  burgerConstructor: TConstrunctorState;
  ingredient: TIngredientState;
  order: TOrderState
};
export type AppDispatch = typeof store.dispatch

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
