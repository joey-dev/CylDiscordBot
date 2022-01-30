import { IOptionalUser, IUser, IUserLogin } from '../../interfaces/api/User';
import { delay, put } from 'redux-saga/effects';
import * as actions from './Action';
import Axios from '../../services/Axios/AxiosConfig';
import { UserResponse } from '../auth/Sagas';
import { getUserRemoveSuccess, setUserFinish } from './Action';

type GetUserSagaAction = {
    payload: GetUserSagaActionPayload
}

type GetUserSagaActionPayload = {
    user: IUserLogin
}

type SetUserSagaAction = {
    payload: SetUserSagaActionPayload
}

type SetUserSagaActionPayload = {
    user: IUser
}

export function* updateUserRemoveSuccessSaga() {
    yield delay(5000);
    yield put(getUserRemoveSuccess());
}

export function* getUserSaga(action: GetUserSagaAction) {
    const updatedUserData = {...action.payload.user};
    const url = '/user';

    const response: UserResponse = yield Axios().get(url).catch(error => {
        put(actions.getUserError(error.message));
    });

    const user: IUser = {
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

    const user: IUser = {
        id: userData.id,
        username: userData.username,
        user_id: userData.user_id,
        token: userData.token,
    };
    yield put(actions.setUserFinish(user));
    yield updateUserRemoveSuccessSaga();
}
