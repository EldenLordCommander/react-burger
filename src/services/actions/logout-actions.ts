import { AppDispatch, AppThunk } from '../..';
import { logout } from '../../utils/burger-api'

export const POST_LOGOUT_REQUEST : 'POST_LOGOUT_REQUEST' = 'POST_LOGOUT_REQUEST';
export const POST_LOGOUT_SUCCESS : 'POST_LOGOUT_SUCCESS' = 'POST_LOGOUT_SUCCESS';
export const POST_LOGOUT_FAILED : 'POST_LOGOUT_FAILED' = 'POST_LOGOUT_FAILED';

export interface IPostLogoutRequestAction{
    readonly type: typeof POST_LOGOUT_REQUEST;
}

export interface IPostLogoutSuccessAction{
    readonly type: typeof POST_LOGOUT_SUCCESS;
    success: boolean,
    message: string,
}

export interface IPostLogoutFailedAction{
    readonly type: typeof POST_LOGOUT_FAILED;
}

export type TPostLogoutActions = 
| IPostLogoutRequestAction
| IPostLogoutSuccessAction
| IPostLogoutFailedAction;

export const postLogoutRequestAction = (): IPostLogoutRequestAction => ({
    type: POST_LOGOUT_REQUEST
  });

export const postLogoutSuccessAction = (
  success: boolean,
  message: string
  ): IPostLogoutSuccessAction => ({
    type: POST_LOGOUT_SUCCESS,
    success,
    message
  });

  export const postLogoutFailedAction = (): IPostLogoutFailedAction => ({
    type: POST_LOGOUT_FAILED
  });

  export const logoutUser: AppThunk = () => (dispatch: AppDispatch) => {
    dispatch(postLogoutRequestAction());
    logout().then(res => {
      if (res && res.success) {
        dispatch(postLogoutSuccessAction(res.success, res.message));
      } else {
        dispatch(postLogoutFailedAction());
      }
    });
  }; 
