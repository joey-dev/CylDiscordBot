import { all, takeEvery } from 'redux-saga/effects';
import { DetailedServer, Server } from '../../interfaces/api/Server';
import * as actionTypes from './ActionTypes';
import { setServerSaga, setServersSaga } from './Sagas';


export function* watchServerSagas() {
    yield all([
        takeEvery<any>(actionTypes.SET_SERVERS_START, setServersSaga),
        takeEvery<any>(actionTypes.SET_SERVER_START, setServerSaga),
    ]);
}

export type ServerStoreState = {
    servers?: Server[];
    server?: DetailedServer;
    loading: boolean
    success?: boolean
    error?: string
};
