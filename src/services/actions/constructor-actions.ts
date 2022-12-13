import { TConstrunctorItem } from "../reducers/constructor-reducer";

export const ADD_BUN_ITEM :'ADD_BUN_ITEM' = 'ADD_BUN_ITEM';
export const DELETE_BUN_ITEM : 'DELETE_BUN_ITEM' = 'DELETE_BUN_ITEM';

export const ADD_COMPONENT_ITEM : 'ADD_COMPONENT_ITEM' = 'ADD_COMPONENT_ITEM';
export const DELETE_COMPONENT_ITEM : 'DELETE_COMPONENT_ITEM' = 'DELETE_COMPONENT_ITEM';

export const UPDATE_CONSTRUCTOR_LIST : 'UPDATE_CONSTRUCTOR_LIST' = 'UPDATE_CONSTRUCTOR_LIST';

// Типизация экшенов
export interface IAddBunItemAction {
    readonly type: typeof ADD_BUN_ITEM;
    readonly payload: TConstrunctorItem;
  }
  export interface IDeleteBunAction {
    readonly type: typeof DELETE_BUN_ITEM;
    readonly payload: TConstrunctorItem;
  }
  export interface IAddComponentItemAction {
    readonly type: typeof ADD_COMPONENT_ITEM;
    readonly payload: TConstrunctorItem;
  }
  
  export interface IDeleteComponentItemAction {
      readonly type: typeof DELETE_COMPONENT_ITEM;
      readonly payload: TConstrunctorItem;
  }

  export interface IUpdateConstrucotListAction {
    readonly type: typeof UPDATE_CONSTRUCTOR_LIST;
    readonly payload: TConstrunctorItem[];
}
  
export type TConstructorActions = 
| IAddBunItemAction
| IDeleteBunAction
| IAddComponentItemAction
| IDeleteComponentItemAction
| IUpdateConstrucotListAction;

  // Генераторы экшенов
  export const addBunItem = (payload: TConstrunctorItem): IAddBunItemAction => ({
    type: ADD_BUN_ITEM,
    payload
  });
  
  export const deleteBunItem = (payload: TConstrunctorItem): IDeleteBunAction => ({
    type: DELETE_BUN_ITEM,
    payload
  }); 

  export const addComponentItem = (payload: TConstrunctorItem): IAddComponentItemAction => ({
    type: ADD_COMPONENT_ITEM,
    payload
  });
  
  export const deleteComponentItem = (payload: TConstrunctorItem): IDeleteComponentItemAction => ({
    type: DELETE_COMPONENT_ITEM,
    payload
  });

  export const updateConstructorList = (payload : TConstrunctorItem[]): IUpdateConstrucotListAction => ({
    type: UPDATE_CONSTRUCTOR_LIST,
    payload
  });