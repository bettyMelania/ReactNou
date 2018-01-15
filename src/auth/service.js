import { serverUrl } from '../core/api';
import { getLogger } from "../core/utils";
import { Alert } from 'react-native';
import {setItem} from "../core/storage";

export const loginService = (user) => {

    return fetch(`${serverUrl}/api/auth/session`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    })
        .then(function (response) {
            return response;
        });
};


export function loginAction(data) {
    return dispatch => Promise.all([
        dispatch(loginStarted()),
        loginService(data).then(response => {
            if (!response.ok) {
                Alert.alert('ERROR', 'User or password is incorrect');
                dispatch(loginFailed('User or password is incorrect'));
            } else {
                return response.json().then(data => {
                    setItem("token",data.token);
                    dispatch(loginSuccess(data));
                });
            }
        })
    ]);
}

export const updateUsernameState = obj => {
    return {
        type: 'UPDATE_USERNAME',
        obj
    }
}
export const updatePasswordState = obj => {
    return {
        type: 'UPDATE_PASSWORD',
        obj
    }
}

export const loginStarted = () => {
    return {
        type: 'LOGIN_STARTED',
    }
}

export const loginSuccess = data => {
    return {
        type: 'LOGIN_SUCCESS',
        data
    }
}

export const loginFailed = data => {
    return {
        type: 'LOGIN_FAILED',
        data
    }
}


export const setToken = obj => {
    return {
        type: 'SET_TOKEN',
        obj
    }
}