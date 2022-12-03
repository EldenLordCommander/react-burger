import { AppDispatch, AppThunk } from '../..';
import { getOrderId } from '../../utils/burger-api'
import { TOrder } from '../reducers/order-reducer';

export const GET_ORDER_REQUEST : 'GET_ORDER_REQUEST' = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS : 'GET_ORDER_SUCCESS' = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED : 'GET_ORDER_FAILED' = 'GET_ORDER_FAILED';
export const DELETE_ORDER_ITEM : 'DELETE_ORDER_ITEM' = 'DELETE_ORDER_ITEM';

export interface IGetOrderRequestAction{
    readonly type: typeof GET_ORDER_REQUEST;
}

export interface IGetOrderSuccessAction{
    readonly type: typeof GET_ORDER_SUCCESS;
    data: TOrder,
}

export interface IGetOrderFailedAction{
    readonly type: typeof GET_ORDER_FAILED;
}

export interface IDeleteOrderAction{
    readonly type: typeof DELETE_ORDER_ITEM;
}

export type TGetOrderActions = 
| IGetOrderRequestAction
| IGetOrderSuccessAction
| IGetOrderFailedAction
| IDeleteOrderAction;

export const getOrderRequestAction = (): IGetOrderRequestAction => ({
    type: GET_ORDER_REQUEST
  });

export const getOrderSuccessAction = (
  data: TOrder
  ): IGetOrderSuccessAction => ({
    type: GET_ORDER_SUCCESS,
    data
  });

  export const getOrderFailedAction = (): IGetOrderFailedAction => ({
    type: GET_ORDER_FAILED
  });

  export const deleteOrderAction = (): IDeleteOrderAction => ({
    type: DELETE_ORDER_ITEM
  });

  export const getOrder: AppThunk = (clickedIngredients : string[]) => (dispatch: AppDispatch) => {
    dispatch(getOrderRequestAction());
    getOrderId(clickedIngredients).then(res => {
      if (res && res.success) {
        dispatch(getOrderSuccessAction(res));
      } else {
        dispatch(getOrderFailedAction());
      }
    });
  };
