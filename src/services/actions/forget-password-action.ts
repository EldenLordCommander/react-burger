import { AppDispatch, AppThunk } from '../..';
import { resetPassword } from '../../utils/burger-api'

export const POST_PASSWORD_REQUEST : 'POST_PASSWORD_REQUEST' = 'POST_PASSWORD_REQUEST';
export const POST_PASSWORD_SUCCESS : 'POST_PASSWORD_SUCCESS' = 'POST_PASSWORD_SUCCESS';
export const POST_PASSWORD_FAILED : 'POST_PASSWORD_FAILED' = 'POST_PASSWORD_FAILED';

export interface IPostPasswordRequestAction{
    readonly type: typeof POST_PASSWORD_REQUEST;
}

export interface IPostPasswordSuccessAction{
    readonly type: typeof POST_PASSWORD_SUCCESS;
    success: boolean;
    message: string;
}

export interface IPostPasswordFailedAction{
    readonly type: typeof POST_PASSWORD_FAILED;
}

export type TForgetPasswordActions = 
| IPostPasswordRequestAction
| IPostPasswordSuccessAction
| IPostPasswordFailedAction;

export const postPasswordRequestAction = (): IPostPasswordRequestAction => ({
    type: POST_PASSWORD_REQUEST
  });

export const postPasswordSuccessAction = (
    success: boolean,
    message: string
  ): IPostPasswordSuccessAction => ({
    type: POST_PASSWORD_SUCCESS,
    success,
    message
  });

  export const postPasswordFailedAction = (): IPostPasswordFailedAction => ({
    type: POST_PASSWORD_FAILED
  });
  
  export const reset: AppThunk = (email: string) => (dispatch: AppDispatch) => {
    dispatch(postPasswordRequestAction());
    resetPassword(email).then(res => {
      if (res && res.success) {
        dispatch(postPasswordSuccessAction(res.succes, res.message));
      } else {
        dispatch(postPasswordFailedAction());
      }
    });
  };
 

