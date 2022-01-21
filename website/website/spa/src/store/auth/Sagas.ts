// @ts-ignore
import Axios from '../../services/Axios/AxiosConfig';
import { call, delay, put } from 'redux-saga/effects';
import * as actions from './Action';
import * as userActions from './../user/Action';
import { User } from '../../interfaces/User';
import { ApiError } from '../../interfaces/api/Error';
import { updateUserState } from './../user/Action';

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
    data?: DataResponse;

    status_code?: number
    error?: string,
    error_description?: string,
};

type DataResponse = {
    data: LoginResponseData;
    user: User;
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


    console.log('requesting...');
    console.log(action);
    console.log(authData);
    const response: LoginResponse = yield Axios('application/x-www-form-urlencoded').post(url, authData).catch((error: ApiError) => {
        // put(actions.authFail(error.response.data.error));
        console.log('error');
    });

    console.log(response);

    if (response.hasOwnProperty("status_code") && response.status_code === 400) {
        console.log('error2');
        return;
    }

    if (!response.data || !response.data.user) {
        console.log('error3');
        return;
    }

    console.log('no error');

    const responseData = response.data

    const expiresIn = responseData.data.expires_in;

    const user: User = responseData.user;

    const expirationDate = new Date().getTime() + expiresIn * 1000;
    localStorage.setItem('token', responseData.data.access_token);
    localStorage.setItem('expirationDate', expirationDate.toString());
    localStorage.setItem('userId', responseData.user.user_id.toString());

    yield put(userActions.updateUserState(user));
    yield put(actions.authSuccess(user.user_id.toString(), responseData.data.access_token));
    yield put(actions.checkAuthTimeout(expiresIn));
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
    const response: UserResponse = yield Axios().get('/user/' + userId).catch((error: ApiError) => {
        put(actions.authFail(error.response.data.error));
    });
    const expiresIn = 3600;

    const user: User = {
        id: response.data.id,
        username: response.data.username,
        user_id: response.data.user_id,
        token: response.data.token,
    };

    // const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    // localStorage.setItem('expirationDate', expirationDate);

    const token = localStorage.getItem('token') || undefined;

    yield put(userActions.updateUserState(user));
    yield put(actions.authSuccess(user.user_id.toString(), token));
    yield put(actions.checkAuthTimeout(expiresIn));
}
