import { all, takeEvery } from 'redux-saga/effects';

import * as actionTypes from './ActionTypes';
import { getUserSaga, setUserSaga } from './Sagas';
import { User } from '../../interfaces/User';


export function* watchUserSagas() {
    yield all([
        takeEvery<any>(actionTypes.GET_USER_START, getUserSaga),
        takeEvery<any>(actionTypes.SET_USER_START, setUserSaga)
    ])
}

export type UserStoreState = {
    user?: User;
    loading: boolean
    success?: boolean
    error?: string
};
