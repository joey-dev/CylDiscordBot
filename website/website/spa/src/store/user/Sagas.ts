import { OptionalUser, User, UserLogin } from '../../interfaces/User';
import { delay, put } from 'redux-saga/effects';
import * as actions from './Action';
import Axios from '../../services/Axios/AxiosConfig';
import { UserResponse } from '../auth/Sagas';
import { getUserRemoveSuccess, setUserFinish } from './Action';

type GetUserSagaAction = {
    payload: GetUserSagaActionPayload
}

type GetUserSagaActionPayload = {
    user: UserLogin
}

type SetUserSagaAction = {
    payload: SetUserSagaActionPayload
}

type SetUserSagaActionPayload = {
    user: User
}

export function* updateUserRemoveSuccessSaga() {
    yield delay(5000);
    yield put(getUserRemoveSuccess());
}

export function* getUserSaga(action: GetUserSagaAction) {
    console.log('finding user...');
    const updatedUserData = {...action.payload.user};
    const url = '/user/' + updatedUserData.user_id;

    const response: UserResponse = yield Axios().get(url).catch(error => {
        put(actions.getUserError(error.message));
    });

    const user: User = {
        id: response.data.id,
        username: response.data.username,
        user_id: response.data.user_id,
        token: response.data.token,
    };
    yield put(actions.getUserFinish(user));
    yield updateUserRemoveSuccessSaga();
}


export function* setUserSaga(action: SetUserSagaAction) {
    const userData = {...action.payload.user};

    const user: User = {
        id: userData.id,
        username: userData.username,
        user_id: userData.user_id,
        token: userData.token,
    };
    yield put(actions.setUserFinish(user));
    yield updateUserRemoveSuccessSaga();
}
