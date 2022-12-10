import { AppDispatch, AppThunk } from '../..';
import { login } from '../../utils/burger-api'
import { TMainForm } from '../../utils/types';
import { TLoginData } from '../reducers/login-reducer';

export const POST_LOGIN_REQUEST : 'POST_LOGIN_REQUEST' = 'POST_LOGIN_REQUEST';
export const POST_LOGIN_SUCCESS : 'POST_LOGIN_SUCCESS' = 'POST_LOGIN_SUCCESS';
export const POST_LOGIN_FAILED : 'POST_LOGIN_FAILED' = 'POST_LOGIN_FAILED';


export interface IPostLoginRequestAction{
    readonly type: typeof POST_LOGIN_REQUEST;
}

export interface IPostLoginSuccessAction{
    readonly type: typeof POST_LOGIN_SUCCESS;
    success: boolean;
    message: string,
    user: TLoginData;
}

export interface IPostLoginFailedAction{
    readonly type: typeof POST_LOGIN_FAILED;
}

export type TPostLoginActions = 
| IPostLoginRequestAction
| IPostLoginSuccessAction
| IPostLoginFailedAction;

export const postLoginRequestAction = (): IPostLoginRequestAction => ({
    type: POST_LOGIN_REQUEST
  });

export const postLoginSuccessAction = (
  success: boolean,
  message: string,
  user: TLoginData
  ): IPostLoginSuccessAction => ({
    type: POST_LOGIN_SUCCESS,
    success,
    message,
    user
  });

  export const postLoginFailedAction = (): IPostLoginFailedAction => ({
    type: POST_LOGIN_FAILED
  });

  export const loginUser: AppThunk = (form: TMainForm) => (dispatch: AppDispatch) => {
    dispatch(postLoginRequestAction());
    login(form).then(res => {
      if (res && res.success) {
        console.log(res);
        dispatch(postLoginSuccessAction(res.success, res.message, res.user));
      } else {
        dispatch(postLoginFailedAction());
      }
    });
  }; 