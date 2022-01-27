import { put } from 'redux-saga/effects';
import { DetailedServer, Server } from '../../interfaces/api/Server';
import Axios from '../../services/Axios/AxiosConfig';
import * as actions from './Action';

type ServersResponse = {
    data: ServersResponseData;
}

type ServersResponseData = {
    servers: Server[];
}

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
}

type ServerResponseData = {
    server: DetailedServer;
}

export function* setServerSaga(action: SetServerSagaAction) {
    const url = '/user/server/' + action.payload.server_id;
    let currentError;
    const response: ServerResponse = yield Axios().get(url).catch(error => {
        currentError = error.message;
    });

    if (response !== undefined || !currentError) {
        yield put(actions.setServerFinish(response.data.server));
    } else {
        yield put(actions.getServerError(currentError));
    }
}
