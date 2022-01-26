import { put } from 'redux-saga/effects';
import { Server } from '../../interfaces/api/Server';
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
        yield put(actions.getServerError("an error happened while trying to get the server data"));
    } else {
        yield put(actions.setServersFinish(response.data.servers));
    }
}
