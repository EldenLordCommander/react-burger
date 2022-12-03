import { TIngredientType } from "../../utils/types";

export const GET_MODAL_ITEM: 'GET_ITEM_MODAL' = 'GET_ITEM_MODAL';
export const DELETE_MODAL_ITEM: 'DELETE_MODAL_ITEM' = 'DELETE_MODAL_ITEM';

export interface IGetModalItemAction {
    readonly type: typeof GET_MODAL_ITEM,
    item: TIngredientType
}

export interface IDeleteModalItemAction {
    readonly type: typeof DELETE_MODAL_ITEM;
}


export type TModalActions =
    | IGetModalItemAction
    | IDeleteModalItemAction;

export const getModalItemAction = (
    item: TIngredientType
): IGetModalItemAction => ({
    type: GET_MODAL_ITEM,
    item
});


export const deleteModalAction = (): IDeleteModalItemAction => ({
    type: DELETE_MODAL_ITEM
});
