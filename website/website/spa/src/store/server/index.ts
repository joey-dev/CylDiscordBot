import { all, takeEvery } from 'redux-saga/effects';
import { IRolesData } from '../../atomic/modecules/dashboard/itemDisplay/settings/types/RoleSetting';
import { IFullModuleWithData } from '../../interfaces/api/Module';
import { IDetailedServer, IServer } from '../../interfaces/api/Server';
import * as actionTypes from './ActionTypes';
import { editServerData, getRoles, setServerSaga, setServersSaga } from './Sagas';


export function* watchServerSagas() {
    yield all([
        takeEvery<any>(actionTypes.SET_SERVERS_START, setServersSaga),
        takeEvery<any>(actionTypes.SET_SERVER_START, setServerSaga),
        takeEvery<any>(actionTypes.EDIT_SERVER_DATA_START, editServerData),
        takeEvery<any>(actionTypes.GET_SERVER_ROLES_START, getRoles),
    ]);
}

export type ServerStoreState = {
    servers?: IServer[];
    server?: IDetailedServer;
    modules?: IFullModuleWithData[];
    roles?: IRolesData[];
    loading: boolean
    success?: boolean
    error?: string
};
