import { IDetailedServer, IServer } from '../../interfaces/api/Server';
import UpdateObject from '../../services/reducer/UpdateObject/UpdateObject';
import * as ActionTypes from './ActionTypes';
import { ServerStoreState } from './Index';

const initialState: ServerStoreState = {
    servers: undefined,
    server: undefined,
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
            return UpdateObject(state, {loading: false, server: payload.server, success: true});
        case ActionTypes.GET_SERVER_ERROR:
            return UpdateObject(state, {loading: false, error: payload.error, server: undefined});
        default:
            return state;
    }
};

export default userReducer;
