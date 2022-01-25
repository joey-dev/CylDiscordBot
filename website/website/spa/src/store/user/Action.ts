import * as actionTypes from './ActionTypes';
import { User, UserLogin } from '../../interfaces/api/User';

export const getUserState = (user: User) => {
    return {
        type: actionTypes.GET_USER_STATE,
        payload: {
            user,
        },
    };
};


export const setUserStart = (user: User) => {
    return {
        type: actionTypes.SET_USER_START,
        payload: {
            user,
        },
    };
};

export const setUserFinish = (user: User) => {
    return {
        type: actionTypes.SET_USER_FINISH,
        payload: {
            user,
        },
    };
};

export const getUserStart = (user: UserLogin) => {
    return {
        type: actionTypes.GET_USER_START,
        payload: {
            user,
        },
    };
};

export const getUserFinish = (user: User) => {
    return {
        type: actionTypes.GET_USER_FINISH,
        payload: {
            user,
        },
    };
};

export const getUserError = (error: string) => {
    return {
        type: actionTypes.GET_USER_ERROR,
        payload: {
            error,
        },
    };
};

export const getUserRemoveSuccess = () => {
    return {
        type: actionTypes.GET_USER_REMOVE_SUCCESS,
    };
};
