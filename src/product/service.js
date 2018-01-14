import { serverUrl } from '../core/api';
import { getLogger } from "../core/utils";
import { Alert } from 'react-native';



export const getAllService = (token) => {
    return fetch(`${serverUrl}/api/product`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        }
    })
        .then(function (response) {
            return response;
        });
};


export const updateService = (data, token) => {

    return fetch(`${serverUrl}/api/product/`+data, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        }
    })
        .then(function (response) {
            return response;
        });
};


export function getAllAction(token) {
    Alert.alert('ERROR', 'getStarted+ token'+token);
    return dispatch => Promise.all([
        dispatch(getStarted()),
        getAllService(token).then(response => {
            if (!response.ok) {
                Alert.alert('ERROR', 'Server error');
                dispatch(getFailed('Error'));
            } else {
                Alert.alert('OK', 'get ok');
                return response.json().then(data => {
                    dispatch(getAllSuccess(data));
                });
            }
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

export function updateAction(data, token) {
    return dispatch => Promise.all([
        dispatch(getStarted()),
        updateService(data, token).then(response => {
            if (!response.ok) {
                Alert.alert('ERROR', 'Could not be updated.');
                dispatch(getFailed('Error'));
            } else {
                Alert.alert('YES!', 'Succesfully updated.');
                return response.json().then(data => {
                    dispatch(updateSuccess(data));
                });
            }
        })
    ]);
}


export const datasetstateSet = obj => {
    return {
        type: 'DATASETSTATE_SET',
        obj
    }
}

export const setDataset = obj => {
    return {
        type: 'DATASET_SET',
        obj
    }
}

export const getStarted = () => {
    return {
        type: 'GET_START'
    }
}

export const getAllSuccess = () => {
    return {
        type: 'GET_ALL_SUCCESS'
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

export const deleteSuccess = () => {
    return {
        type: 'DELETE_SUCCESS'
    }
}
