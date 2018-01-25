import { serverUrl,authHeaders } from '../core/api';
import {Alert, NetInfo} from 'react-native';
import { setItem, getItem } from "../core/storage";

export const getAllService = (token) => {
    return fetch(`${serverUrl}/api/product`, {
        method: 'GET',
        headers: authHeaders(token)
        })
        .then(function (response) {
            return response;
        });
};


export const updateService = (data, token) => {

    return fetch(`${serverUrl}/api/product/`+data.id, {
        method: 'PUT',
        headers: authHeaders(token),
        body: JSON.stringify(data)
    })
        .then(function (response) {
            return response;
        });
};


export function getAllAction(token) {
    return dispatch => Promise.all([
        dispatch(getStarted()),
        getAllService(token).then(response => {
            if (!response.ok) {
                Alert.alert('ERROR', 'Server error');
                dispatch(getFailed('Error'));
            } else {

                return response.json().then(data => {
                    setItem("dataset",data);
                    dispatch(getAllSuccess(data));
                });
            }
        }).catch(error => {
            alert(error);
        })
    ]);
}

export function getAction(token, currentPage) {
    return dispatch => Promise.all([
        dispatch(getStarted()),
        getService(token, currentPage).then(response => {
            if (!response.ok) {
                Alert.alert('ERROR', 'Server error');
                dispatch(getFailed('Error'));
            } else {
                return response.json().then(data => {
                    dispatch(getSuccess(data));
                });
            }
        })
    ]);
}

export function updateProductAction(data, token) {
    return dispatch => Promise.all([
        dispatch(updateStarted()),
        updateService(data, token).then(response => {
            if (!response.ok) {

                Alert.alert('ERROR', 'Could not be updated.');
                dispatch(updateFailed('Error'));
            } else {
                Alert.alert('YES!', 'Succesfully updated.');

                return response.json().then(data => {
                    dispatch(updateSuccess(data));
                });
            }
        }).catch(error => {
            alert(error);
            })
    ]);
}

export const getStarted = () => {
    return {
        type: 'GET_START'
    }
}

export const getAllSuccess = (obj) => {
    return {
        type: 'GET_ALL_SUCCESS',
        obj
    }
}

export const getSuccess = obj => {
    return {
        type: 'GET_SUCCESS',
        obj
    }
}


export const getFailed = obj => {
    return {
        type: 'GET_FAIL',
        obj
    }
}

export const updateFailed = obj => {
    return {
        type: 'UPDATE_FAIL',
        obj
    }
}

export const updateSuccess = () => {
    return {
        type: 'UPDATE_SUCCESS'
    }
}


export const updateNameState = obj => {
    return {
        type: 'UPDATE_NAME',
        obj
    }
}
export const updatePriceState = obj => {
    return {
        type: 'UPDATE_PRICE',
        obj
    }
}
export const updateAmountState = obj => {
    return {
        type: 'UPDATE_AMOUNT',
        obj
    }
}

export const toUpdateView = obj => {
    return {
        type: 'UPDATE_VIEW',
        obj
    }
}

export const productUpdated = obj => {
    return {
        type: 'PRODUCT_UPDATED',
        obj
    }
}
export const updateStarted = () => {
    return {
        type: 'UPDATE_START'
    }
}
