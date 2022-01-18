import { all, takeEvery } from 'redux-saga/effects';

import * as actionTypes from './ActionTypes';
import { updateUserSaga } from './Sagas';


export function* watchUserSagas() {
    yield all([
        takeEvery<any>(actionTypes.UPDATE_USER_START, updateUserSaga)
    ])
}
