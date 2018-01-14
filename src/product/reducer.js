export const productReducer = (state = { error: null, datasetState: null, isLoading: false, token: null }, action) => {
    switch (action.type) {
        case 'GET_SUCCESS':
            return { ...state, isLoading: false, dataset: thelist.concat(action.obj) }
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
        case 'DATASETSTATE_SET':
            return { ...state, datasetState: action.obj }
        case 'DATASET_SET':
            return { ...state, dataset: action.obj }
        default:
            return state;
    }
};

export default productReducer