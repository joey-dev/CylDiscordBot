import * as actionTypes from './ActionTypes';
import { IUser, IUserLogin } from '../../interfaces/api/User';

export const getUserState = (user: IUser) => {
    return {
        type: actionTypes.GET_USER_STATE,
        payload: {
            user,
        },
    };
};


export const setUserStart = (user: IUser) => {
    return {
        type: actionTypes.SET_USER_START,
        payload: {
            user,
        },
    };
};

export const setUserFinish = (user: IUser) => {
    return {
        type: actionTypes.SET_USER_FINISH,
        payload: {
            user,
        },
    };
};

export const getUserStart = (user: IUserLogin) => {
    return {
        type: actionTypes.GET_USER_START,
        payload: {
            user,
        },
    };
};

export const getUserFinish = (user: IUser) => {
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
