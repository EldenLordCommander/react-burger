import { ReactNode } from 'react';
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
