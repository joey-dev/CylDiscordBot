import { IChannelData } from '../../atomic/modecules/dashboard/itemDisplay/settings/types/ChannelSetting';
import { IRoleData } from '../../atomic/modecules/dashboard/itemDisplay/settings/types/RoleSetting';
import { IFullPluginWithData } from '../../interfaces/api/Plugin';
import { IDetailedServer, IServer } from '../../interfaces/api/Server';
import UpdateObject from '../../services/reducer/UpdateObject/UpdateObject';
import * as ActionTypes from './ActionTypes';
import { ServerStoreState } from './index';

const initialState: ServerStoreState = {
    servers: undefined,
    server: undefined,
    modules: undefined,
    roles: undefined,
    loading: false,
    success: false,
    error: undefined,
};

export type Actions = {
    type: string;
    payload: Payload;
};

type Payload = {
    servers?: IServer[];
    server?: IDetailedServer;
    modules?: IFullPluginWithData[];
    roles?: IRoleData;
    channels?: IChannelData;
    error?: string
    server_id?: string;
};

const userReducer = (state: ServerStoreState = initialState, {type, payload}: Actions) => {
    switch (type) {
        case ActionTypes.GET_SERVERS_STATE:
            return UpdateObject(state, {servers: payload.servers});
        case ActionTypes.SET_SERVERS_START:
            return UpdateObject(state, {loading: true});
        case ActionTypes.SET_SERVERS_FINISH:
            return UpdateObject(state, {loading: false, servers: payload.servers, success: true});
        case ActionTypes.SET_SERVER_START:
            return UpdateObject(state, {loading: true});
        case ActionTypes.SET_SERVER_FINISH:
            return UpdateObject(state, {loading: false, server: payload.server, modules: payload.modules, success: true});
        case ActionTypes.GET_SERVER_ERROR:
            return UpdateObject(state, {loading: false, error: payload.error, server: undefined});
        case ActionTypes.EDIT_SERVER_DATA_FINISH:
            return UpdateObject(state, {loading: false, modules: payload.modules, success: true});
        case ActionTypes.GET_SERVER_ROLES_FINISH:
            return UpdateObject(state, {loading: false, roles: payload.roles?.roles, success: true});
        case ActionTypes.GET_SERVER_CHANNELS_FINISH:
            return UpdateObject(state, {loading: false, channels: payload.channels?.channels, success: true});
        default:
            return state;
    }
};

export default userReducer;
