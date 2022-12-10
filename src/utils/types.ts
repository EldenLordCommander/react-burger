import { ReactNode } from 'react';
import { WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_CONNECTION_START, WS_CONNECTION_SUCCESS, WS_GET_ORDERS, WS_SEND_MESSAGE } from '../services/actions/wsActions';
import { TConstrunctorItem } from '../services/reducers/constructor-reducer';

export type TIngredientType = {
    _id: string;
    name: string;
    image: string;
    image_large: string;
    image_mobile: string;
    price: number;
    type: string;
    proteins: number;
    fat: number;
    calories: number;
    carbohydrates: number;
}

export type TMainForm = {
    email: string;
    password: string;
}

export type TRegisterForm = TMainForm & {
    name: string;
}

export type TResetForm = {
    password: string;
    token: string;
}

export type TModal = {
    children: ReactNode,
    title?: string;
};

export type TBurgerConstructorItem = {
    index: number;
    moveCard?: (dragIndex: number, hoverIndex: number) => void;
    item: TConstrunctorItem;
};

export type TProtectedRoute = {
    children?: ReactNode;
    rest?: any;
};

export type TLocationState = {
    state: {
        pathname?: string;
        background?: any;
    }
}

export type TWSActions = {
    wsInit: typeof WS_CONNECTION_START,
    onOpen: typeof WS_CONNECTION_SUCCESS,
    onClose: typeof WS_CONNECTION_CLOSED,
    onError: typeof WS_CONNECTION_ERROR,
    onMessage: typeof WS_GET_ORDERS,
    onSend: typeof WS_SEND_MESSAGE
  };

  export type TOrder = {
    _id : string,
    status: string,
    number: number,
    name: string,
    createdAt: string,
    updateAt: string,
    ingredients: string[]
  }

  export type TOrderRequest = {
    total : number,
    totalToday : number,
    success: boolean,
    orders: Array<TOrder>
  }