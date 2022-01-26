import { Server } from '../../interfaces/api/Server';
import * as actionTypes from './ActionTypes';

export const getServersState = (server: Server[]) => {
    return {
        type: actionTypes.GET_SERVERS_STATE,
        payload: {
            server,
        },
    };
};


export const setServersStart = () => {
    return {
        type: actionTypes.SET_SERVERS_START,
    };
};

export const setServersFinish = (servers: Server[]) => {
    return {
        type: actionTypes.SET_SERVERS_FINISH,
        payload: {
            servers,
        },
    };
};

export const getServerError = (error: string) => {
    return {
        type: actionTypes.GET_SERVER_ERROR,
        payload: {
            error,
        },
    };
};
