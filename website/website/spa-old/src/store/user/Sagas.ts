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
    const url = '/users/' + updatedUserData.userId;

    try {
        const response: UserResponse = yield Axios('application/merge-patch+json').patch(url, updatedUserData);
        const user: OptionalUser = {
            userId: response.data.id,
            username: response.data.username,
            email: response.data.email,
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            roles: response.data.roles,
        };
        yield put(actions.updateUserFinish(user));
        yield updateUserRemoveSuccessSaga();
    } catch (error) {
        yield put(actions.updateUserError(error.message));

    }
}
