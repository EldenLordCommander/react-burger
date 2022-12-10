import { TOrder, TOrderRequest } from "../../utils/types";

export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const WS_SEND_MESSAGE: 'WS_SEND_MESSAGE' = 'WS_SEND_MESSAGE';
export const WS_GET_ORDERS: 'WS_GET_ORDERS' = 'WS_GET_ORDERS';

export interface IWsConnectionStartAction{
  readonly type: typeof WS_CONNECTION_START;
  readonly wsUrl: string
}

export interface IWsConnectionSuccessAction{
  readonly type: typeof WS_CONNECTION_SUCCESS;
}

export interface IWsConnectionErrorAction{
  readonly type: typeof WS_CONNECTION_ERROR;
}

export interface IWsConnectionCloseAction{
  readonly type: typeof WS_CONNECTION_CLOSED;
}

export interface IWsGetOrdersAction{
  readonly type: typeof WS_GET_ORDERS,
  readonly payload: TOrderRequest
}

export interface IWsSendOrdersAction{
  readonly type: typeof WS_SEND_MESSAGE,
  readonly payload: TOrderRequest
}

export type TWSActions = 
| IWsConnectionStartAction
| IWsConnectionSuccessAction
| IWsConnectionErrorAction
| IWsConnectionCloseAction
| IWsGetOrdersAction
| IWsSendOrdersAction

export const wsConnectionStartAction = (wsUrl : string) : IWsConnectionStartAction => {
  return {
    type: WS_CONNECTION_START,
    wsUrl
  };
};

export const wsConnectionSuccessAction = () : IWsConnectionSuccessAction => {
  return {
    type: WS_CONNECTION_SUCCESS
  };
};

export const wsConnectionErrorAction = () : IWsConnectionErrorAction => {
  return {
    type: WS_CONNECTION_ERROR
  };
};

export const wsConnectionClosedAction = () : IWsConnectionCloseAction => {
  return {
    type: WS_CONNECTION_CLOSED
  };
};


export const wsGetOrders = (orders : TOrderRequest) : IWsGetOrdersAction => {
  return {
    type: WS_GET_ORDERS,
    payload: orders
  };
};

export const wsSendOrders = (orders : TOrderRequest) : IWsSendOrdersAction => {
  return {
    type: WS_SEND_MESSAGE,
    payload: orders
  };
};
