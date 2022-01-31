import { IFullPluginWithData } from '../../interfaces/api/Plugin';
import { IDetailedServer, IServer } from '../../interfaces/api/Server';
import * as actionTypes from './ActionTypes';
import { IEditServerData } from './Sagas';

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

export const setServerFinish = (server: IDetailedServer, modules: IFullPluginWithData[]) => {
    return {
        type: actionTypes.SET_SERVER_FINISH,
        payload: {
            server,
            modules,
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

export const editServerDataStart = (server_id: string, data: IEditServerData) => {
    return {
        type: actionTypes.EDIT_SERVER_DATA_START,
        payload: {
            server_id,
            data,
        },
    };
};

export const editServerDataFinished = (modules: IFullPluginWithData[]) => {
    return {
        type: actionTypes.EDIT_SERVER_DATA_FINISH,
        payload: {
            modules,
        },
    };
};
