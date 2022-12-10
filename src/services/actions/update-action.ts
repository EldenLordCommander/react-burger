import { AppDispatch, AppThunk } from '../..';
import { updateUserData, updateWithRefresh } from '../../utils/burger-api'
import { TRegisterForm } from '../../utils/types';
import { TLoginData } from '../reducers/login-reducer';

export const PATCH_USER_REQUEST : 'PATCH_USER_REQUEST' = 'PATCH_USER_REQUEST';
export const PATCH_USER_SUCCESS : 'PATCH_USER_SUCCESS'= 'PATCH_USER_SUCCESS';
export const PATCH_USER_FAILED : 'PATCH_USER_FAILED' = 'PATCH_USER_FAILED';

export interface IPatchUserRequestAction{
    readonly type: typeof PATCH_USER_REQUEST;
}

export interface IPatchUserSuccessAction{
    readonly type: typeof PATCH_USER_SUCCESS;
    success: boolean;
    message: string,
    user: TLoginData;
}

export interface IPatchUserFailedAction{
    readonly type: typeof PATCH_USER_FAILED;
}

export type TPatchUserActions = 
| IPatchUserRequestAction
| IPatchUserSuccessAction
| IPatchUserFailedAction;

export const PatchUserRequestAction = (): IPatchUserRequestAction => ({
    type: PATCH_USER_REQUEST
  });

export const PatchUserSuccessAction = (
  success: boolean,
  message: string,
  user: TLoginData
  ): IPatchUserSuccessAction => ({
    type: PATCH_USER_SUCCESS,
    success,
    message,
    user
  });

  export const PatchUserFailedAction = (): IPatchUserFailedAction => ({
    type: PATCH_USER_FAILED
  });

  export const updateUser: AppThunk = (form: TRegisterForm) => (dispatch: AppDispatch) => {
    dispatch(PatchUserRequestAction());
    updateUserData(form).then(res => {
      if (res && res.success) {
        dispatch(PatchUserSuccessAction(res.success, res.message, res.user));
      } else {
        dispatch(PatchUserFailedAction());
      }
    });
  }; 

  export const updateUserWithRefresh: AppThunk = (form: TRegisterForm) => (dispatch: AppDispatch) => {
    dispatch(PatchUserRequestAction());
    updateWithRefresh(form).then(res => {
      if (res && res.success) {
        dispatch(PatchUserSuccessAction(res.success, res.message, res.user));
      } else {
        dispatch(PatchUserFailedAction());
      }
    });
  }; 

// export function updateUser(form) {
//     return function (dispatch) {
//         dispatch({
//             type: PATCH_USER_REQUEST
//         })
//         updateUserData(form).then(res => {
//             if (res) {
//                 dispatch({
//                     type: PATCH_USER_SUCCESS,
//                     data: res
//                 })
//             } else {
//                 throw new Error(res.errorMessage)
//             }
//         }).catch(err => {
//             dispatch({
//                 type: PATCH_USER_FAILED
//             })
//         })
//     }
// } 


// export function updateUserWithRefresh(form){
//     return function (dispatch) {
//         dispatch({
//             type: PATCH_USER_REQUEST
//         })
//         updateWithRefresh(form).then(res => {
//             console.log(res);
//             if (res) {
//                 dispatch({
//                     type: PATCH_USER_SUCCESS,
//                     data: res
//                 })
//             } else {
//                 throw new Error(res.errorMessage)
//             }
//         }).catch(err => {
//             dispatch({
//                 type: PATCH_USER_FAILED
//             })
//         })
//     }
// }