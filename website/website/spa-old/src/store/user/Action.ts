import * as actionTypes from './ActionTypes';
import { OptionalUser, User } from '../../interfaces/User';

export const updateUserState = (user: User) => {
    return {
        type: actionTypes.UPDATE_USER_STATE,
        payload: {
            user,
        },
    };
};

export const updateUserStart = (user: OptionalUser) => {
    return {
        type: actionTypes.UPDATE_USER_START,
        payload: {
            user,
        },
    };
};

export const updateUserFinish = (user: OptionalUser) => {
    return {
        type: actionTypes.UPDATE_USER_FINISH,
        payload: {
            user,
        },
    };
};

export const updateUserError = (error: string) => {
    return {
        type: actionTypes.UPDATE_USER_ERROR,
        payload: {
            error,
        },
    };
};

export const updateUserRemoveSuccess = () => {
    return {
        type: actionTypes.UPDATE_USER_REMOVE_SUCCESS,
    };
};
