import { IChannelData } from '../../atomic/modecules/dashboard/itemDisplay/settings/types/ChannelSetting';
import { IRoleData } from '../../atomic/modecules/dashboard/itemDisplay/settings/types/RoleSetting';
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

export const getServerRolesStart = (server_id: string) => {
    return {
        type: actionTypes.GET_SERVER_ROLES_START,
        payload: {
            server_id,
        },
    };
};

export const getServerRolesFinish = (roles: IRoleData) => {
    return {
        type: actionTypes.GET_SERVER_ROLES_FINISH,
        payload: {
            roles,
        },
    };
};

export const getServerChannelsStart = (server_id: string) => {
    return {
        type: actionTypes.GET_SERVER_CHANNELS_START,
        payload: {
            server_id,
        },
    };
};


export const getServerChannelsFinish = (channels: IChannelData) => {
    return {
        type: actionTypes.GET_SERVER_CHANNELS_FINISH,
        payload: {
            channels,
        },
    };
};
