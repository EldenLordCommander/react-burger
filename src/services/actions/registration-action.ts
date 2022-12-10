import { AppDispatch, AppThunk } from '../..';
import { registerUser } from '../../utils/burger-api'
import { TRegisterForm } from '../../utils/types';
import { TRegistrationUser } from '../reducers/registration-reducer';

export const POST_REGISTRATION_REQUEST : 'POST_REGISTRATION_REQUEST' = 'POST_REGISTRATION_REQUEST';
export const POST_REGISTRATION_SUCCESS : 'POST_REGISTRATION_SUCCESS' = 'POST_REGISTRATION_SUCCESS';
export const POST_REGISTRATION_FAILED : 'POST_REGISTRATION_FAILED' = 'POST_REGISTRATION_FAILED';

export interface IPostRegistrationRequestAction{
    readonly type: typeof POST_REGISTRATION_REQUEST;
}

export interface IPostRegistrationSuccessAction{
    readonly type: typeof POST_REGISTRATION_SUCCESS;
    success: boolean,
    message: string,
    user: TRegistrationUser
}

export interface IPostRegistrationFailedAction{
    readonly type: typeof POST_REGISTRATION_FAILED;
}

export type TPostRegistrationActions = 
| IPostRegistrationRequestAction
| IPostRegistrationSuccessAction
| IPostRegistrationFailedAction;

export const postRegistrationRequestAction = (): IPostRegistrationRequestAction => ({
    type: POST_REGISTRATION_REQUEST
  });

export const postRegistrationSuccessAction = (
  success: boolean,
  message: string,
  user: TRegistrationUser
  ): IPostRegistrationSuccessAction => ({
    type: POST_REGISTRATION_SUCCESS,
    success,
    message,
    user
  });

  export const postRegistrationFailedAction = (): IPostRegistrationFailedAction => ({
    type: POST_REGISTRATION_FAILED
  });

  export const savePassword: AppThunk = (form : TRegisterForm) => (dispatch: AppDispatch) => {
    dispatch(postRegistrationRequestAction());
    registerUser(form).then(res => {
      if (res && res.success) {
        dispatch(postRegistrationSuccessAction(res.success, res.message, res.user));
      } else {
        dispatch(postRegistrationFailedAction());
      }
    });
  }; 
