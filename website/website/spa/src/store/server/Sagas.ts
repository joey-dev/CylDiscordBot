import { put } from 'redux-saga/effects';
import { IChannelData } from '../../atomic/modecules/dashboard/itemDisplay/settings/types/ChannelSetting';
import { IRoleData } from '../../atomic/modecules/dashboard/itemDisplay/settings/types/RoleSetting';
import { IComponentServerSettingsData } from '../../interfaces/api/Component';
import { IFullPluginWithData } from '../../interfaces/api/Plugin';
import { IDetailedServer, IServer } from '../../interfaces/api/Server';
import Axios from '../../services/Axios/AxiosConfig';
import * as actions from './Action';

export type IEditServerData = {
    module_id?: number;
    plugin_id?: number;
    component_id?: number;
    checked?: boolean;
    server_data?: IComponentServerSettingsData;
    type: 'plugin' | 'component';
};


type ServersResponse = {
    data: ServersResponseData;
};

type ServersResponseData = {
    servers: IServer[];
};

export function* setServersSaga() {
    const url = '/user/servers';

    const response: ServersResponse = yield Axios().get(url).catch(error => {
        put(actions.getServerError(error.message));
    });

    if (response === undefined) {
        yield put(actions.getServerError('an error happened while trying to get the server data'));
    } else {
        yield put(actions.setServersFinish(response.data.servers));
    }
}

type SetServerSagaAction = {
    payload: SetServerSagaPayload;
};

type SetServerSagaPayload = {
    server_id: string;
};

type ServerResponse = {
    data: ServerResponseData;
};

type ServerResponseData = {
    server: IDetailedServer;
};

type ModuleResponse = {
    data: IFullPluginWithData[];
};


export function* setServerSaga(action: SetServerSagaAction) {
    const url = '/user/server/' + action.payload.server_id;
    let currentError = '';
    const response: ServerResponse = yield Axios().get(url).catch(error => {
        currentError = error.message;
    });

    const moduleUrl = '/module/all/' + action.payload.server_id;
    let currentModuleError = '';
    const moduleResponse: ModuleResponse = yield Axios().get(moduleUrl).catch(error => {
        currentModuleError = error.message;
    });

    if (response !== undefined || !currentError || !currentModuleError || moduleResponse !== undefined) {
        yield put(actions.setServerFinish(response.data.server, moduleResponse.data));
    } else {
        yield put(actions.getServerError(currentError + currentModuleError));
    }
}

type EditServerDataSagaAction = {
    payload: EditServerDataSagaPayload;
};

type EditServerDataSagaPayload = {
    server_id: string;
    data: IEditServerData;
};


export function* editServerData(action: EditServerDataSagaAction) {
    switch (action.payload.data.type) {
        case 'plugin':
            yield editPluginServerData(action);
            break;
        case 'component':
            yield editComponentServerData(action);
            break;
    }
}

function* editPluginServerData(action: EditServerDataSagaAction) {
    const url = '/module/plugin/' + action.payload.server_id;
    let currentError = '';
    const response: ModuleResponse = yield Axios().patch(url, {
        plugin_id: action.payload.data.plugin_id,
        checked: action.payload.data.checked ? 1 : 0,
        return: true,
    }).catch(error => {
        currentError = error.message;
    });

    if (response !== undefined || !currentError) {
        yield put(actions.editServerDataFinished(response.data));
    } else {
        yield put(actions.getServerError(currentError));
    }
}


function* editComponentServerData(action: EditServerDataSagaAction) {
    const url = '/module/component/' + action.payload.server_id;
    let currentError = '';
    let data = '{}';
    if (action.payload.data.server_data) {
        data = JSON.stringify(action.payload.data.server_data);
    }

    const response: ModuleResponse = yield Axios().patch(url, {
        component_id: action.payload.data.component_id,
        checked: action.payload.data.checked ? 1 : 0,
        data: data,
        return: true,
    }).catch(error => {
        currentError = error.message;
    });

    if (response !== undefined || !currentError) {
        yield put(actions.editServerDataFinished(response.data));
    } else {
        yield put(actions.getServerError(currentError));
    }
}

type GetRolesSagaAction = {
    payload: GetRolesSagaPayload;
};

type GetRolesSagaPayload = {
    server_id: string;
};

type GetRolesReturn = {
    data: IRoleData;
};


export function* getRoles(action: GetRolesSagaAction) {
    const url = `/user/server/${action.payload.server_id}/roles`;
    let currentError = '';

    const response: GetRolesReturn = yield Axios().get(url).catch(error => {
        currentError = error.message;
    });

    if (response !== undefined || !currentError) {
        yield put(actions.getServerRolesFinish(response.data));
    } else {
        yield put(actions.getServerError(currentError));
    }
}


type GetChannelsSagaAction = {
    payload: GetChannelsSagaPayload;
};

type GetChannelsSagaPayload = {
    server_id: string;
};

type GetChannelsReturn = {
    data: IChannelData;
};


export function* getChannels(action: GetChannelsSagaAction) {
    const url = `/user/server/${action.payload.server_id}/channels`;
    let currentError = '';

    const response: GetChannelsReturn = yield Axios().get(url).catch(error => {
        currentError = error.message;
    });

    if (response !== undefined || !currentError) {
        yield put(actions.getServerChannelsFinish(response.data));
    } else {
        yield put(actions.getServerError(currentError));
    }
}
