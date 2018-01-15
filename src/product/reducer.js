
export const productReducer = (state = { error: null,  isLoading: false, token: null, dataset: null }, action) => {
    switch (action.type) {
        case 'GET_ALL_SUCCESS':
            return { ...state, isLoading: false, dataset: action.obj }
        case 'GET_FAIL':
            return { ...state, isLoading: false, error: action.obj }
        case 'UPDATE_SUCCESS':
            return state;
        case 'GET_START':
            return { ...state, isLoading: true }
        case 'DATASET_SET':
            return { ...state, dataset: action.obj }
        case 'UPDATE_VIEW':
            return { ...state, product: action.obj }
        case 'PRODUCT_UPDATED':
            items = [...state.dataset];
            index = items.findIndex((i) => i._id == action.obj.id);
            if (index != -1) {
                items.splice(index, 1, action.obj);
            } else {
                items.push(action.obj);
            }
            return { ...state, dataset:items }
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