import { AppDispatch, AppThunk } from '../..';
import { getIngredients } from '../../utils/burger-api'
import { TIngredientType } from '../../utils/types';

export const GET_DATA_REQUEST : 'GET_DATA_REQUEST' = 'GET_DATA_REQUEST';
export const GET_DATA_SUCCESS : 'GET_DATA_SUCCESS' = 'GET_DATA_SUCCESS';
export const GET_DATA_FAILED : 'GET_DATA_FAILED'= 'GET_DATA_FAILED';

export interface IGetDataRequestAction{
  readonly type: typeof GET_DATA_REQUEST;
}

export interface IGetDataSuccessAction{
  readonly type: typeof GET_DATA_SUCCESS;
  data: Array<TIngredientType>;
}

export interface IGetDataFailedAction{
  readonly type: typeof GET_DATA_FAILED;
}

export type TGetDataActions = 
| IGetDataRequestAction
| IGetDataSuccessAction
| IGetDataFailedAction;

export const getDataRequestAction = (): IGetDataRequestAction => ({
  type: GET_DATA_REQUEST
});

export const getDataSuccessAction = (
  data: Array<TIngredientType>
): IGetDataSuccessAction => ({
  type: GET_DATA_SUCCESS,
  data
});

export const getDataFailedAction = (): IGetDataFailedAction => ({
  type: GET_DATA_FAILED
});

export const getData: AppThunk = () => (dispatch: AppDispatch) => {
  dispatch(getDataRequestAction());
  getIngredients().then(res => {
    if (res) {
      dispatch(getDataSuccessAction(res));
    } else {
      dispatch(getDataFailedAction());
    }
  });
};