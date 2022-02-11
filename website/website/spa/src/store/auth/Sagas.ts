import Axios from '../../services/Axios/AxiosConfig';
import { call, delay, put } from 'redux-saga/effects';
import * as actions from './Action';
import * as userActions from './../user/Action';
import { IUser } from '../../interfaces/api/User';
import { IApiError } from '../../interfaces/api/Error';

type LogoutSageAction = {
    logoutSucceed: () => void;
};

export function* logoutSaga(action: LogoutSageAction) {
    yield call([localStorage, 'removeItem'], 'token');
    yield call([localStorage, 'removeItem'], 'expirationDate');
    yield call([localStorage, 'removeItem'], 'userId');
    yield put(actions.logoutSucceed());
}

type CheckAuthTimeoutSagaAction = {
    logout: () => void;
    payload: CheckAuthTimeoutSagaActionPayload;
};

type CheckAuthTimeoutSagaActionPayload = {
    expirationTime: number;
};

export function* checkAuthTimeoutSaga(action: CheckAuthTimeoutSagaAction) {
    yield delay(action.payload.expirationTime * 1000);
    yield put(actions.logout());
}

type AuthUserSagaAction = {
    payload: AuthUserSagaPayload;
};

type AuthUserSagaPayload = {
    code: string;
};

type LoginResponse = {
    data: DataResponse;
};

type DataResponse = {
    data: LoginResponseData;
    user: IUser;

    status_code?: number
    error?: string,
    error_description?: string,
}

type LoginResponseData = {
    access_token: string,
    token_type: string,
    expires_in: number,
    refresh_token: string,
    scope: string
};

export function* authUserSaga(action: AuthUserSagaAction) {
    yield put(actions.authStart());
    const authData = {
        code: action.payload.code,
    };
    const url = '/authenticate/check';

    const response: LoginResponse = yield Axios('application/x-www-form-urlencoded').post(url, authData).catch((error: IApiError) => {
        put(actions.authFail(error.response.data.error));
    });

    if (response.data.hasOwnProperty("status_code") && response.data.status_code !== 200 && response.data.error && response.data.error_description) {
        yield put(actions.authFail({
            name: response.data.error,
            message: response.data.error_description
        }));
    } else {
        const responseData = response.data

        const expiresIn = responseData.data.expires_in;

        const user: IUser = responseData.user;

        const expirationDate = new Date().getTime() + expiresIn * 1000;
        localStorage.setItem('token', responseData.data.access_token);
        localStorage.setItem('expirationDate', expirationDate.toString());
        localStorage.setItem('userId', responseData.user.user_id.toString());

        yield put(userActions.setUserStart(user));
        yield put(actions.authSuccess(user.user_id.toString(), responseData.data.access_token));
        yield put(actions.checkAuthTimeout(expiresIn));
    }

}

export function* authCheckStateSaga(action: {}) {
    yield put(actions.authCheckStateStart());

    const token = localStorage.getItem('token');
    if (!token || token === 'undefined') {
        yield put(actions.logout());
    } else {
        const expirationDateStorage = localStorage.getItem('expirationDate');
        if (!expirationDateStorage) {
            yield put(actions.authCheckStateFinish());
            return;
        }
        const expirationDate = new Date(parseInt(expirationDateStorage));
        if (expirationDate <= new Date()) {
            yield put(actions.logout());
            yield put(actions.authCheckStateFinish());
            return;
        }
        const userId = localStorage.getItem('userId');

        if (userId === null) {
            yield put(actions.logout());
            yield put(actions.authCheckStateFinish());
            return;
        }

        yield authUserLoginWithId(userId);
    }
    yield put(actions.authCheckStateFinish());
}

export type UserResponse = {
    data: UserResponseData;
};

type UserResponseData = {
    id: number;
    username: string;
    token: string;
    user_id: string;
};

function* authUserLoginWithId(userId: string) {
    const response: UserResponse = yield Axios().get('/user').catch((error: IApiError) => {
        put(actions.authFail(error.response.data.error));
    });

    const user: IUser = {
        id: response.data.id,
        username: response.data.username,
        user_id: response.data.user_id,
        token: response.data.token,
    };

    yield put(userActions.setUserStart(user));
    yield put(actions.authSuccess(user.user_id.toString(), user.token));
}
