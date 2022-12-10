import { AppDispatch, AppThunk } from '../..';
import { setPassword } from '../../utils/burger-api'
import { TRegisterForm } from '../../utils/types';

export const POST_RESET_REQUEST : 'POST_RESET_REQUEST' = 'POST_RESET_REQUEST';
export const POST_RESET_SUCCESS : 'POST_RESET_SUCCESS' = 'POST_RESET_SUCCESS';
export const POST_RESET_FAILED : 'POST_RESET_FAILED' = 'POST_RESET_FAILED';
export const SAVE_PASSWORD : 'SAVE_PASSWORD' = 'SAVE_PASSWORD';

export interface IPostResetRequestAction{
    readonly type: typeof POST_RESET_REQUEST;
}

export interface IPostResetSuccessAction{
    readonly type: typeof POST_RESET_SUCCESS;
    success: boolean,
    message: string;
}

export interface IPostResetFailedAction{
    readonly type: typeof POST_RESET_FAILED;
}

export interface ISavePasswordAction{
    readonly type: typeof SAVE_PASSWORD;
}

export type TPostResetActions = 
| IPostResetRequestAction
| IPostResetSuccessAction
| IPostResetFailedAction
| ISavePasswordAction;

export const postResetRequestAction = (): IPostResetRequestAction => ({
    type: POST_RESET_REQUEST
  });

export const postResetSuccessAction = (
  success: boolean,
  message: string
  ): IPostResetSuccessAction => ({
    type: POST_RESET_SUCCESS,
    success,
    message
  });

  export const postResetFailedAction = (): IPostResetFailedAction => ({
    type: POST_RESET_FAILED
  });

  export const savePasswordAction = (): ISavePasswordAction => ({
    type: SAVE_PASSWORD
  });

  export const savePassword: AppThunk = (form: TRegisterForm) => (dispatch: AppDispatch) => {
    dispatch(postResetRequestAction());
    setPassword(form).then(res => {
      if (res && res.success) {
        console.log(res);
        dispatch(postResetSuccessAction(res.success, res.message));
      } else {
        dispatch(postResetFailedAction());
      }
    });
  }; 

// export function savePassword(form) {
//     return function (dispatch) {
//         dispatch({
//             type: POST_RESET_REQUEST
//         })
//         setPassword(form).then(res => {
//             if (res) {
//                 dispatch({
//                     type: POST_RESET_SUCCESS,
//                     data: res
//                 })
//             } else {
//                 throw new Error(res.errorMessage)
//             }
//         }).catch(err => {
//             dispatch({
//                 type: POST_RESET_FAILED
//             })
//         })
//     }
// } 