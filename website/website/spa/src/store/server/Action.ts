import { IDetailedServer, IServer } from '../../interfaces/api/Server';
import * as actionTypes from './ActionTypes';

export const getServersState = (server: IServer[]) => {
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

export const setServersFinish = (servers: IServer[]) => {
    return {
        type: actionTypes.SET_SERVERS_FINISH,
        payload: {
            servers,
        },
    };
};

export const setServerStart = (server_id: string) => {
    return {
        type: actionTypes.SET_SERVER_START,
        payload: {
            server_id,
        },
    };
};

export const setServerFinish = (server: IDetailedServer) => {
    return {
        type: actionTypes.SET_SERVER_FINISH,
        payload: {
            server,
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
