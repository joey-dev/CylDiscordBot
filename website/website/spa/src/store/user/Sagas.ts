import { OptionalUser } from '../../interfaces/User';
import { delay, put } from 'redux-saga/effects';
import * as actions from './Action';
import Axios from '../../services/Axios/AxiosConfig';
import { UserResponse } from '../auth/Sagas';
import { updateUserRemoveSuccess } from './Action';

type UpdateUserSagaAction = {
    payload: UpdateUserSagaActionPayload
}

type UpdateUserSagaActionPayload = {
    user: OptionalUser
}

export function* updateUserRemoveSuccessSaga() {
    yield delay(5000);
    yield put(updateUserRemoveSuccess());
}

export function* updateUserSaga(action: UpdateUserSagaAction) {
    const updatedUserData = {...action.payload.user};
    const url = '/user/' + updatedUserData.user_id;

    const response: UserResponse = yield Axios('application/merge-patch+json').patch(url, updatedUserData).catch(error => {
        put(actions.updateUserError(error.message));
    });
    const user: OptionalUser = {
        id: response.data.id,
        username: response.data.username,
        user_id: response.data.user_id,
        token: response.data.token,
    };
    yield put(actions.updateUserFinish(user));
    yield updateUserRemoveSuccessSaga();
}
