import {Alert} from "react-native";

export const productReducer = (state = { error: null,  isLoading: false, token: null, dataset: null }, action) => {
    switch (action.type) {
        case 'GET_ALL_SUCCESS':
            return { ...state, isLoading: false, dataset: action.obj }
        case 'GET_FAIL':
            return { ...state, isLoading: false, error: action.obj }
        case 'DELETE_SUCCESS':
            return { ...state, error: null }
        case 'UPDATE_SUCCESS':
            return state;
        case 'GET_START':
            return { ...state, isLoading: true }
        case 'DATASET_SET':
            return { ...state, dataset: action.obj }
        case 'UPDATE_VIEW':
            return { ...state, product: action.obj }
        default:
            return state;
    }
};
export const productEditReducer = (state = { error: null, isLoading: false, token: null, name: '',price: '',amount: '' }, action) => {
    switch (action.type) {
        case 'GET_START':
            return { ...state, isLoading: true }
        case 'UPDATE_SUCCESS':
            return { ...state, isLoading: false }
        case 'UPDATE_FAIL':
            return { ...state, isLoading: false, error: action.obj }
        case 'UPDATE_NAME':
            return { ...state, name: action.obj }
        case 'UPDATE_PRICE':
            return { ...state, price: action.obj }
        case 'UPDATE_AMOUNT':
            return { ...state, amount: action.obj }
        default:
            return state;
    }
};