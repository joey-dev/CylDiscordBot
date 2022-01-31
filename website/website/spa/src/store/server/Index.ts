import { all, takeEvery } from 'redux-saga/effects';
import { IFullModuleWithData } from '../../interfaces/api/Module';
import { IDetailedServer, IServer } from '../../interfaces/api/Server';
import * as actionTypes from './ActionTypes';
import { setServerSaga, setServersSaga } from './Sagas';


export function* watchServerSagas() {
    yield all([
        takeEvery<any>(actionTypes.SET_SERVERS_START, setServersSaga),
        takeEvery<any>(actionTypes.SET_SERVER_START, setServerSaga),
    ]);
}

export type ServerStoreState = {
    servers?: IServer[];
    server?: IDetailedServer;
    modules?: IFullModuleWithData[];
    loading: boolean
    success?: boolean
    error?: string
};
