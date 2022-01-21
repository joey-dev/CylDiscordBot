import { all, takeEvery } from 'redux-saga/effects';

import * as actionTypes from './ActionTypes';
import { updateUserSaga } from './Sagas';
import { User } from '../../interfaces/User';


export function* watchUserSagas() {
    yield all([
        takeEvery<any>(actionTypes.UPDATE_USER_START, updateUserSaga)
    ])
}

export type UserStoreState = {
    user?: User;
    loading: boolean
    success?: boolean
    error?: string
};
