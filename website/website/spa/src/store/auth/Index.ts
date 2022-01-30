import { all, takeEvery } from 'redux-saga/effects';

import * as actionTypes from './ActionTypes';
import { authCheckStateSaga, authUserSaga, checkAuthTimeoutSaga, logoutSaga } from './Sagas';
import { IUser } from '../../interfaces/api/User';

export function* watchAuthSagas() {
    yield all([
        takeEvery<any>(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
        takeEvery<any>(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
        takeEvery<any>(actionTypes.AUTH_USER, authUserSaga),
        takeEvery<any>(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga),
    ]);
}

export type AuthStoreState = {
    token: string | null;
    userId?: string | null;
    error: string | null;
    loading: boolean;
    isAuthenticated?: boolean;
    authRedirectPath: string;
    user?: IUser;
    isAutoSigningUp?: boolean;
};
