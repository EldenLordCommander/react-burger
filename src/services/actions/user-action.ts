import { AppDispatch, AppThunk } from '../..';
import { getUser, fetchWithRefresh } from '../../utils/burger-api'
import { TLoginData } from '../reducers/login-reducer';

export const POST_USER_REQUEST : 'POST_USER_REQUEST' = 'POST_USER_REQUEST';
export const POST_USER_SUCCESS : 'POST_USER_SUCCESS' = 'POST_USER_SUCCESS';
export const POST_USER_FAILED : 'POST_USER_FAILED'= 'POST_USER_FAILED';
export const CLEAR_USER_DATA : 'CLEAR_USER_DATA' = 'CLEAR_USER_DATA';

export interface IPostUserRequestAction{
    readonly type: typeof POST_USER_REQUEST;
}

export interface IPostUserSuccessAction{
    readonly type: typeof POST_USER_SUCCESS;
    success: boolean;
    message: string,
    user: TLoginData;
}

export interface IPostUserFailedAction{
    readonly type: typeof POST_USER_FAILED;
}

export interface IClearUserDataAction{
    readonly type: typeof CLEAR_USER_DATA;
}

export type TPostUserActions = 
| IPostUserRequestAction
| IPostUserSuccessAction
| IPostUserFailedAction
| IClearUserDataAction;

export const PatchUserRequestAction = (): IPostUserRequestAction => ({
    type: POST_USER_REQUEST
  });

export const PatchUserSuccessAction = (
  success: boolean,
  message: string,
  user: TLoginData
  ): IPostUserSuccessAction => ({
    type: POST_USER_SUCCESS,
    success,
    message,
    user
  });

  export const PatchUserFailedAction = (): IPostUserFailedAction => ({
    type: POST_USER_FAILED
  });

  export const ClearUserAction = (): IClearUserDataAction => ({
    type: CLEAR_USER_DATA
  });

  export const getCurrentUser: AppThunk = () => (dispatch: AppDispatch) => {
    dispatch(PatchUserRequestAction());
    getUser().then(res => {
      if (res && res.success) {
        dispatch(PatchUserSuccessAction(res.success, res.message, res.user));
      } else {
        dispatch(PatchUserFailedAction());
      }
    });
  }; 

  export const getUserWithRefresh: AppThunk = () => (dispatch: AppDispatch) => {
    dispatch(PatchUserRequestAction());
    fetchWithRefresh().then(res => {
      if (res && res.success) {
        dispatch(PatchUserSuccessAction(res.success, res.message, res.user));
      } else {
        dispatch(PatchUserFailedAction());
      }
    });
  }; 
