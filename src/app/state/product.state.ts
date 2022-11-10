export enum ProductActionsTypes{
GET_ALL_PRODUCTS="[Product] Get All products",
GET_SELECTED_PRODUCTS="[Product] Get Selected products",
GET_AVAILABLE_PRODUCTS="[Product] Get Available products",
SEARCH_PRODUCTS="[Product] Search products",
NEW_PRODUCTS="[Product] New products",
DELETE_PRODUCTS="[Product] Delete products",
UPDATE_PRODUCTS="[Product] Update products",
SELECTED_PRODUCTS="[Product] Selected products",
}

export interface ActionEvent{
    type:ProductActionsTypes,
    payload?:any
}

export enum DataStateEnum{
    LOADING,
    LOADED,
    ERROR,
}

export interface AppDataState<T>{
    dataState?: DataStateEnum,
    data?:T,
    errorMessage?:string
}