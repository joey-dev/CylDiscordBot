import { all, takeEvery } from 'redux-saga/effects';
import { Server } from '../../interfaces/api/Server';
import * as actionTypes from './ActionTypes';
import { setServersSaga } from './Sagas';


export function* watchServerSagas() {
    yield all([
        takeEvery<any>(actionTypes.SET_SERVERS_START, setServersSaga),
    ]);
}

export type ServerStoreState = {
    servers?: Server[];
    loading: boolean
    success?: boolean
    error?: string
};
